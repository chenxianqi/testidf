import { CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import site from '../../idf.json';

const points = [
  { icon: Sparkles, title: '专业12', text: '多年经验的团队,为你量身定制方案' },
  { icon: MessageCircle, title: '贴心12', text: '一对一顾问,有问题随时找得到人' },
  { icon: CheckCircle2, title: '靠谱1', text: '透明的流程和价格,不满意可退' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{site.name}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          一句话说清你能帮客户解决什么问题。1
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block rounded-xl bg-brand px-8 py-3 font-semibold text-white shadow-lg hover:bg-brand-dark"
        >
          免费咨询
        </a>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p.icon className="h-8 w-8 text-brand" />
            <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
            <p className="mt-2 text-slate-600">{p.text}</p>
          </div>
        ))}
      </section>

      <section id="contact" className="mx-auto max-w-xl px-6 pb-24">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-6 text-center text-2xl font-bold">留下联系方式,顾问尽快联系你</h2>
          <LeadForm form="main" />
        </div>
      </section>
    </main>
  );
}
