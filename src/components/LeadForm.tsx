import { useEffect, useState, type FormEvent } from 'react';
import clsx from 'clsx';
import { getForm, submitForm, type FormField, type FormSchema } from '../lib/idf';

// 平台表单:字段在平台「表单」里编辑,这里按字段画出来、交给平台(建客户 + 触发流程)。
// 想要完全自定义的样子:自己写输入框,提交时调 submitForm(form, {...}) 即可。
export default function LeadForm({ form, className }: { form: string; className?: string }) {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [values, setValues] = useState<Record<string, string | string[] | boolean>>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<FormSchema['thanks'] | null>(null);

  useEffect(() => {
    getForm(form, true)
      .then(setSchema)
      .catch((e: Error) => setError(e.message));
  }, [form]);

  const set = (k: string, v: string | string[] | boolean) => setValues((s) => ({ ...s, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const r = await submitForm(form, values);
      if (r.redirect) location.href = r.redirect;
      else setDone(r.thanks);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={clsx('py-8 text-center', className)}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white">✓</div>
        <h3 className="text-xl font-bold">{done.title}</h3>
        {done.text && <p className="mt-2 text-slate-600">{done.text}</p>}
      </div>
    );
  }
  if (!schema) {
    return <div className={clsx('py-8 text-center text-slate-500', className)}>{error || '加载中…'}</div>;
  }

  const input =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20';

  const field = (f: FormField) => {
    const v = values[f.key];
    switch (f.type) {
      case 'hidden':
        return null;
      case 'textarea':
        return <textarea className={input} rows={4} placeholder={f.placeholder} value={(v as string) ?? ''} onChange={(e) => set(f.key, e.target.value)} />;
      case 'select':
        return (
          <select className={input} value={(v as string) ?? ''} onChange={(e) => set(f.key, e.target.value)}>
            <option value="">{f.placeholder || '请选择'}</option>
            {f.options?.map((o) => <option key={o}>{o}</option>)}
          </select>
        );
      case 'radio':
      case 'checkbox': {
        const multi = f.type === 'checkbox';
        const cur = multi ? ((v as string[]) ?? []) : v;
        return (
          <div className="space-y-2">
            {f.options?.map((o) => (
              <label key={o} className="flex cursor-pointer items-center gap-2">
                <input
                  type={f.type}
                  className="accent-brand"
                  checked={multi ? (cur as string[]).includes(o) : cur === o}
                  onChange={(e) =>
                    set(f.key, multi ? (e.target.checked ? [...(cur as string[]), o] : (cur as string[]).filter((x) => x !== o)) : o)
                  }
                />
                {o}
              </label>
            ))}
          </div>
        );
      }
      case 'consent':
        return (
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 accent-brand" checked={!!v} onChange={(e) => set(f.key, e.target.checked)} />
            <span>{f.label}{f.required && <b className="text-brand"> *</b>}</span>
          </label>
        );
      default:
        return (
          <input
            className={input}
            type={f.type === 'phone' ? 'tel' : f.type === 'email' || f.type === 'number' || f.type === 'date' ? f.type : 'text'}
            placeholder={f.placeholder}
            value={(v as string) ?? ''}
            onChange={(e) => set(f.key, e.target.value)}
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit} className={clsx('space-y-4', className)} noValidate>
      {schema.fields.map((f) =>
        f.type === 'hidden' ? null : (
          <div key={f.key}>
            {f.type !== 'consent' && (
              <label className="mb-1 block text-sm font-semibold">
                {f.label}
                {f.required && <b className="text-brand"> *</b>}
              </label>
            )}
            {field(f)}
            {f.help && <p className="mt-1 text-xs text-slate-500">{f.help}</p>}
          </div>
        ),
      )}
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-brand py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {busy ? '提交中…' : schema.submit_text || '提交'}
      </button>
    </form>
  );
}
