'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Code2,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  RemoveFormatting,
} from 'lucide-react';

function ToolButton({
  label,
  active = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${active
        ? 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}
    >
      {children}
    </button>
  );
}

export default function BlogContentEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value || '',
    onUpdate: ({ editor: updatedEditor }) => onChangeRef.current(updatedEditor.getHTML()),
    editorProps: {
      attributes: {
        class: 'blog-editor-content',
        'aria-label': 'Write and format your blog story',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false);
    }
  }, [editor, value]);

  const setLink = () => {
    if (!editor) return;
    const currentHref = editor.getAttributes('link').href || '';
    const href = window.prompt('Enter the link URL', currentHref);
    if (href === null) return;
    if (!href.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: href.trim() }).run();
  };

  if (!editor) {
    return <div aria-hidden="true" className="min-h-[24rem] animate-pulse rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900" />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10 dark:border-slate-700 dark:bg-slate-950">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/80 p-2 dark:border-slate-800 dark:bg-slate-900/70" role="toolbar" aria-label="Story formatting">
        <ToolButton label="Paragraph" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}><span className="text-xs font-semibold">P</span></ToolButton>
        <ToolButton label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={17} /></ToolButton>
        <ToolButton label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={17} /></ToolButton>
        <span aria-hidden="true" className="mx-1 h-6 border-l border-slate-200 dark:border-slate-700" />
        <ToolButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></ToolButton>
        <ToolButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></ToolButton>
        <ToolButton label="Add or edit link" active={editor.isActive('link')} onClick={setLink}><Link2 size={16} /></ToolButton>
        <span aria-hidden="true" className="mx-1 h-6 border-l border-slate-200 dark:border-slate-700" />
        <ToolButton label="Bulleted list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={17} /></ToolButton>
        <ToolButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={17} /></ToolButton>
        <ToolButton label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></ToolButton>
        <ToolButton label="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code2 size={16} /></ToolButton>
        <ToolButton label="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}><RemoveFormatting size={16} /></ToolButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
