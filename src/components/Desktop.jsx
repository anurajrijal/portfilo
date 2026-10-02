import { FileIcon } from './Icons';

const iconCls =
  'rounded-md p-1.5 text-center text-[13px] text-ink [word-break:break-all] hover:bg-hi/10 hover:outline hover:outline-1 hover:outline-line focus-visible:bg-hi/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-line';

export default function Desktop({ files, onOpen }) {
  return (
    <main className="grid max-w-[760px] grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-x-2 gap-y-[18px] px-6 pb-[110px] pt-7">
      {files.map((f) => (
        <button
          key={f.id}
          type="button"
          data-hover
          className={iconCls}
          onClick={(e) => onOpen(f.id, e.currentTarget)}
        >
          <FileIcon type={f.icon || f.name.split('.').pop()} />
          {f.name}
        </button>
      ))}
    </main>
  );
}
