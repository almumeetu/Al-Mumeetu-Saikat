import { BriefcaseBusiness, Code2, Globe2 } from 'lucide-react';

const PROOF = [
  { icon: BriefcaseBusiness, value: '4+ years', label: 'shipping production software' },
  { icon: Code2, value: 'React + Next.js', label: 'frontend-first engineering' },
  { icon: Globe2, value: 'Remote ready', label: 'clear, async collaboration' },
];

export default function TrustBar() {
  return (
    <section className="border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#0d1011]">
      <div className="container-custom grid divide-y divide-slate-200/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-slate-800">
        {PROOF.map(({ icon: Icon, value, label }) => (
          <div key={value} className="flex items-center gap-4 px-0 py-6 sm:px-7 lg:px-10">
            <Icon size={19} className="shrink-0 text-emerald-700 dark:text-emerald-400" />
            <div><p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{label}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
