import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit';

import Bold from '@tiptap/extension-bold';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import BulletList from '@tiptap/extension-bullet-list';
// import History from '@tiptap/extension-history';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

export const extensions = [
  StarterKit,
  Document,
  Paragraph,
  Text,
  Placeholder.configure({
    placeholder: 'Introduza / para ações…',
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'is-empty',
    showOnlyCurrent: false,
    showOnlyWhenEditable: false,
  }),
  Image,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Underline,
  BubbleMenu,
  Placeholder,
  TextAlign,
  //   History,
];
