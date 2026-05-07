import Link from 'next/link';

const highlights = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Delivered', value: '250+' },
  { label: 'Happy Clients', value: '100+' },
];

export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="container-custom space-y-12">
        <div className="max-w-3xl space-y-5">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            About Me
          </span>
          <h1 className="text-2xl font-extrabold leading-normal md:text-3xl lg:text-4xl">
            Next.js Full-Stack Developer specializing in 100% pixel-perfect design development and eCommerce solutions.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            I work on WordPress builds, frontend development, and conversion-oriented website experiences for clients
            around the world. The goal is to keep the work fast, maintainable, and easy for teams to evolve.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="card p-6 text-center">
              <div className="text-4xl font-extrabold gradient-text">{item.value}</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="card space-y-4 p-8">
            <h2 className="text-2xl font-bold">How I work</h2>
            <p className="text-slate-600 dark:text-slate-400">
              I start with structure and clarity, then layer in visual polish and motion where it improves the product
              rather than distracting from it. The emphasis is always on performance, accessibility, and conversion.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              If you need a landing page, WordPress build, or a frontend implementation with a clean handoff, I can
              help ship it.
            </p>
          </div>

          <div className="card space-y-6 p-8">
            <h2 className="text-2xl font-bold">Education</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-lg">BSc in CSE <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">Running</span></h3>
                <p className="text-primary font-medium">World University Of Bangladesh</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">2025 - Present</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-lg">HSC in Science</h3>
                <p className="text-primary font-medium">Jahangirpur Govt. Collage, Mohadevpur, Naogaon</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Dec 2019 - Dec 2021</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-lg">SSC in Science</h3>
                <p className="text-primary font-medium">Bagdob High School, Mohadevpur, Naogaon</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Jan 2014 - Nov 2019</p>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Online Courses</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Web Designer Courses</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">BanglaDevs, Dhaka</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">PSD to HTML</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Bangla-devs</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SASS & Bootstrap</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Bangla-devs</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">WordPress Theme Development</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Weblearn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card space-y-4 p-8 lg:col-span-2">
            <h2 className="text-2xl font-bold">Availability</h2>
            <p className="text-slate-600 dark:text-slate-400">Open to freelance projects, collaborations, and long-term work.</p>
            <Link href="/contact" className="btn-primary">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}