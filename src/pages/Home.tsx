import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Flower2,
  Leaf,
  MapPin,
  Moon,
  Sun,
  Users,
  Waves,
  Wind,
} from 'lucide-react';
import LeadForm from '../components/LeadForm';
import site from '../../idf.json';

const courses = [
  {
    icon: Sun,
    name: '哈他基础',
    text: '从呼吸、站姿和最简单的前屈开始。动作慢,老师会一个个过来调整,零基础也不慌。',
    meta: '周一 / 周三 / 周五 19:30',
  },
  {
    icon: Moon,
    name: '阴瑜伽 · 修复',
    text: '每个体式在地面和抱枕上停三到五分钟,把久坐一天的腰背和髋慢慢松开。',
    meta: '周二 / 周四 21:00',
  },
  {
    icon: Waves,
    name: '流瑜伽',
    text: '动作跟着呼吸连着走,半小时后身体就热起来,适合已经练过一阵的人。',
    meta: '周六 09:00 · 周日 10:30',
  },
  {
    icon: Flower2,
    name: '一对一私教',
    text: '孕产恢复、肩颈劳损、想练得更细,都可以约老师单练,时间跟着你定。',
    meta: '随时可约 · 60 / 90 分钟',
  },
];

const first = [
  {
    icon: Clock,
    text: '提前 15 分钟到,换鞋、喝杯温水,不用带任何装备。',
  },
  {
    icon: Users,
    text: '每班最多 8 人,老师开课前会问一句身体状况,今天不舒服就休息,没人催你。',
  },
  {
    icon: Wind,
    text: '下课后有十分钟的休息术,裹上毯子躺着,等呼吸落定了再走。',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-20 border-b border-brand/10 bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
              <Leaf className="h-[18px] w-[18px]" />
            </span>
            <span className="font-serif text-lg tracking-wide">{site.name}</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-ink/65 md:flex">
            <a href="#courses" className="transition hover:text-brand-dark">课程</a>
            <a href="#first" className="transition hover:text-brand-dark">第一次来</a>
            <a href="#space" className="transition hover:text-brand-dark">空间</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-dark"
          >
            预约体验
          </a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-24 h-64 w-64 rounded-full bg-sand blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-20 text-center md:pt-24 md:pb-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs tracking-widest text-brand-dark ring-1 ring-brand/15">
            <Leaf className="h-3.5 w-3.5" />
            小班 · 慢练 · 离家五分钟
          </span>
          <h1 className="mt-7 font-serif text-[2.1rem] leading-[1.3] tracking-tight md:text-5xl md:leading-[1.25]">
            把呼吸放慢,
            <br className="md:hidden" />
            把身体还给自己
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
            一间安安静静的瑜伽小屋。没有镜子前的比较,没有催你的口令 ——
            每周来两次,练完能好好睡一觉,就是这里的全部目标。
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 font-medium text-white shadow-sm shadow-brand/30 transition hover:bg-brand-dark sm:w-auto"
            >
              免费体验一节课
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#courses"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand/25 px-7 py-3.5 font-medium text-ink/80 transition hover:border-brand/50 hover:text-brand-dark sm:w-auto"
            >
              看看有哪些课
            </a>
          </div>
          <p className="mt-6 text-xs text-ink/45">提供瑜伽垫、抱枕和毯子,穿宽松衣服来就行</p>
        </div>
      </section>

      <section id="courses" className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.2em] text-brand-dark">课程</p>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl">四类课,按你今天的状态挑</h2>
            <p className="mt-3 text-ink/65">累了去修复,有精神就练流瑜伽。新同学先上哈他基础或私教。</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {courses.map((c) => (
              <article
                key={c.name}
                className="group rounded-3xl bg-cream p-6 ring-1 ring-brand/10 transition hover:ring-brand/30 md:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.text}</p>
                <p className="mt-5 flex items-center gap-2 text-xs text-brand-dark">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {c.meta}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 flex items-start gap-2 text-sm text-ink/55">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            单次 120 元,10 次卡 980 元,有效期 3 个月。第一次来不收钱,觉得合适再买。
          </p>
        </div>
      </section>

      <section id="first" className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[2rem] bg-brand-light/70 p-7 md:p-12">
            <p className="text-xs tracking-[0.2em] text-brand-dark">第一次来</p>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl">不用担心自己「太僵」</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {first.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-dark">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-relaxed text-ink/75">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="space" className="pb-16 md:pb-20">
        <div className="mx-auto grid max-w-5xl gap-4 px-6 md:grid-cols-[1.2fr_1fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sand via-cream to-brand-light p-8 md:p-12">
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/50 blur-2xl" />
            <h2 className="relative font-serif text-2xl md:text-3xl">一间不太吵的屋子</h2>
            <p className="relative mt-4 max-w-md leading-relaxed text-ink/70">
              木地板、落地窗、几盆养了很久的绿植。屋里不放快节奏的音乐,课前十分钟只有呼吸和窗帘的声音。
              练完可以坐一会儿,喝茶,再回家。
            </p>
            <div className="relative mt-8 flex flex-wrap gap-2 text-xs text-brand-dark">
              {['木地板', '自然采光', '更衣间', '茶歇角', '不限人数之外的安静'].map((t) => (
                <span key={t} className="rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-brand/15">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/70 p-8 ring-1 ring-brand/10 md:p-10">
            <h3 className="font-serif text-xl">怎么找到我们</h3>
            <ul className="mt-5 space-y-4 text-sm text-ink/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                老城区文昌路 18 号 3 楼,小区门口有棵大榕树
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                周一至周五 09:00–21:30,周末 08:30–18:00
              </li>
              <li className="flex gap-3">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                每班最多 8 人,建议提前一天约
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white/70 py-16 md:py-20">
        <div className="mx-auto max-w-xl px-6">
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] text-brand-dark">预约</p>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl">留个电话,帮你排一节体验课</h2>
            <p className="mt-3 text-sm text-ink/60">
              告诉我们方便的时间,老师会加你微信确认。也可以直接到店问,不用先交钱。
            </p>
          </div>
          <div className="mt-8 rounded-[1.75rem] bg-cream p-6 ring-1 ring-brand/10 md:p-8">
            <LeadForm form="main" />
          </div>
        </div>
      </section>

      <footer className="border-t border-brand/10 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-center text-xs text-ink/45">
          <span className="flex items-center gap-2 font-serif text-sm text-ink/60">
            <Leaf className="h-4 w-4 text-brand" />
            {site.name}
          </span>
          <span>瑜伽 · 呼吸 · 慢下来</span>
        </div>
      </footer>
    </main>
  );
}
