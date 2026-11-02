// 平台 SDK:表单(连 CRM)、路由前缀。不要改这个文件 —— 平台升级模板时会整份替换。
//
//   getForm('main')                取表单字段(在平台「表单」里编辑,改字段不用改代码)
//   submitForm('main', {...})      提交 → 平台建客户、触发流程;失败抛 Error(message 可以直接给访客看)
//
// 'main' 是 idf.json 里 forms 的名字;也可以直接传表单地址段(/f/ 后面那串)。
import site from '../../idf.json';

export type FormField = {
  key: string;
  label: string;
  type:
    | 'text'
    | 'textarea'
    | 'phone'
    | 'email'
    | 'wechat'
    | 'number'
    | 'date'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'consent'
    | 'hidden';
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
  default?: string;
};

export type FormSchema = {
  title?: string;
  description?: string;
  fields: FormField[];
  submit_text?: string;
  theme?: string;
  thanks: { title: string; text?: string; redirect_url?: string };
};

export type SubmitResult = { thanks: FormSchema['thanks']; redirect?: string };

type Value = string | string[] | boolean | number;

// 平台上:同域(/f/… 由网关转发)。本地开发:vite 代理转到 idf.json 的 api。
const API = (import.meta.env.VITE_IDF_API as string | undefined) ?? '';

function slugOf(form: string): string {
  const forms = (site as { forms?: Record<string, string> }).forms ?? {};
  return forms[form] ?? form;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(API + path, init);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j?.error?.message ?? '网络出错了,请稍后再试');
  return j.data as T;
}

/** 表单字段定义。view=true 记一次浏览(漏斗数字用),画出表单时传。 */
export function getForm(form: string, view = false): Promise<FormSchema> {
  return call<FormSchema>(`/f/${encodeURIComponent(slugOf(form))}/schema${view ? '?view=1' : ''}`);
}

/** 网址上的 utm_* 等参数:同名的隐藏字段会自动带上。 */
export function urlParams(): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(location.search));
}

/** 提交表单。data 的 key 对应表单字段的 key;多选传数组。 */
export function submitForm(form: string, data: Record<string, Value>): Promise<SubmitResult> {
  return call<SubmitResult>(`/f/${encodeURIComponent(slugOf(form))}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...urlParams(), ...data, _page: location.href }),
  });
}

/** 路由前缀。平台托管时页面在 /s/{站点}/ 下(由 <base> 告诉我们),自定义域名和本地开发是 /。 */
export function basename(): string {
  const p = new URL(document.baseURI).pathname.replace(/\/$/, '');
  return p === '' || p.endsWith('.html') ? '/' : p;
}
