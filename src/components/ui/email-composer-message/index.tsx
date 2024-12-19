'use client';
import { EditorContent, useEditor } from '@tiptap/react';

import { extensions } from './extensions';
import { EmailComposerMessageToolbar } from './toolbar';

interface Props {
  content?: string;
  onChange?(content: string): void;
}

export function EmailComposerMessage(props: Props) {
  const { content, onChange } = props;

  const editor = useEditor({
    extensions,
    content,

    editorProps: {
      attributes: {
        class:
          'flex w-full bg-white text-sm focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    editable: true,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <EmailComposerMessageToolbar editor={editor} />
      <EditorContent
        editor={editor}
        contentEditable={true}
        placeholder="Introduza / para ações…"
        className="min-h-[264px] rounded-md border border-neutral-200 bg-white px-3 py-2 focus:outline-none"
      />
    </>
  );
}
