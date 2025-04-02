import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import Link from "@tiptap/extension-link"
import Blockquote from "@tiptap/extension-blockquote"
import CodeBlock from "@tiptap/extension-code-block"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import { useCallback } from "react"
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight,
  Quote, Code, Image as ImageIcon, Link as LinkIcon,
  Undo2, Redo2, Minus
} from "lucide-react"

interface TiptapEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
  onUploadImage?: (file: File) => Promise<string>
}

export default function ContentEditor({ initialValue = "", onChange, onUploadImage }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Image.configure({ inline: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: false }),
      Blockquote,
      CodeBlock,
      HorizontalRule,
    ],
    content: initialValue,
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[300px] focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  const handleImageInsert = useCallback(() => {
    if (!editor || !onUploadImage) return
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const url = await onUploadImage(file)
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor, onUploadImage])

  if (!editor) return null

  return (
    <div className="border p-4 rounded bg-white text-black">
      <div className="flex flex-wrap gap-2 mb-3 text-sm">
        <button onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>P</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="w-4 h-4" /></button>
        <button onClick={handleImageInsert}><ImageIcon className="w-4 h-4" /></button>
        <button onClick={() => {
          const url = prompt("リンクのURLを入力してください：")
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }}><LinkIcon className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().unsetLink().run()}>Unlink</button>
        <button onClick={() => editor.chain().focus().undo().run()}><Undo2 className="w-4 h-4" /></button>
        <button onClick={() => editor.chain().focus().redo().run()}><Redo2 className="w-4 h-4" /></button>
      </div>
      <EditorContent editor={editor} className="min-h-[300px] border rounded px-4 py-2" />
    </div>
  )
}