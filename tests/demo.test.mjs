import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
async function load(path) {
  const code = ts.transpileModule(await readFile(new URL(path, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}
const { repository, seed, resetDemo } = await load('../lib/demo.ts');
const { validateAppointment } = await load('../lib/appointments.ts');
const storage = new Map();
globalThis.localStorage = { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) };
test('dados persistem, exemplos são independentes e restauração funciona', async () => {
  const data = await repository.load(); data.clinics[0].name = 'Alterada';
  assert.notEqual(seed.clinics[0].name, 'Alterada');
  await repository.save(data); assert.equal((await repository.load()).clinics[0].name, 'Alterada');
  resetDemo(); assert.equal((await repository.load()).clinics[0].name, seed.clinics[0].name);
});
test('armazenamento corrompido ou bloqueado gera erro recuperável', async () => {
  storage.set('intellicare-demo-v1', '{broken'); await assert.rejects(repository.load());
  storage.set('intellicare-demo-v1', JSON.stringify({ ...seed, conversations: [{ id: 'invalid' }] })); await assert.rejects(repository.load());
  resetDemo(); const original = localStorage.setItem;
  localStorage.setItem = () => { throw new Error('Quota exceeded'); };
  await assert.rejects(repository.save(seed)); localStorage.setItem = original;
});
test('agendamento detecta sobreposição e permite horários adjacentes', () => {
  const now = new Date('2026-01-01T00:00').getTime();
  const appointments = [{ id: '1', name: 'Exemplo', when: '2026-12-01T10:00', duration: '45', status: 'confirmed' }];
  assert.match(validateAppointment('2026-12-01T10:30', 30, appointments, now), /outro agendamento/);
  assert.match(validateAppointment('2026-12-01T09:45', 30, appointments, now), /outro agendamento/);
  assert.equal(validateAppointment('2026-12-01T10:45', 30, appointments, now), null);
  assert.equal(validateAppointment('2026-12-01T10:00', 30, [{ ...appointments[0], status: 'cancelled' }], now), null);
  assert.match(validateAppointment('invalid', 30, [], now), /futuros/);
  assert.match(validateAppointment('2025-12-01T10:00', 30, [], now), /futuros/);
});
