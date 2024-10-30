// // "use client";
"use client";
import React, { useCallback, useState } from "react";
import {
  AiOutlineBold,
  AiOutlineClose,
  AiOutlineEnter,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineRedo,
  AiOutlineStrikethrough,
  AiOutlineUndo,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BiParagraph } from "react-icons/bi";
import { FiCode } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineLayersClear } from "react-icons/md";
import { PiCodeBlock, PiQuotes } from "react-icons/pi";
import { TbSpacingVertical } from "react-icons/tb";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import axios from "axios";
import NextImage from "next/image";

const Tiptap = ({ setContent }) => {
  const [imageList, setImageList] = useState([]); // State to track uploaded images
  const extensions = [StarterKit, ImageExtension];
  const content = ``;

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "border-2 border-gray-400 bg-white mt-4 rounded-md min-h-[100px] p-2 focus:outline-blue-600",
      },
    },

    extensions,
    content,
    injectCSS: false,
    immediatelyRender: false,
    onUpdate: () => {
      // Call setContent with the current editor content whenever it updates
      setContent(editor.getHTML()); // Get the content in HTML format
    },
  });

  // const handleImageRequestOnActions = async (file,action) => {
  //   try {
  //     // Generate a pre-signed URL
  //     // Upload the file to S3 using the pre-signed URL
  //     if ( action ==="upload"){
  //       const data = {
  //         fileName: file.name,
  //         fileType: file.type,
  //       };
  //       const response = await axios.post(
  //         `http://localhost:8000/api/generate_presigned_url/`,
  //         data
  //       );
  //       const { url } = response.data;

  //       await axios.put(url, file, {
  //         headers: {
  //           "Content-Type": file.type,
  //         },
  //       });
  //       // setImageList((prevList) => [...prevList, imageUrl]); // Add image URL to the list

  //     } else if (action ==="delete"){

  //       const response = await axios.post(
  //         `http://localhost:8000/api/generate_delete_presigned_url/`,
  //         {fileUrl:file}
  //       );
  //       const { url } = response.data;

  //       await axios.delete(url);
  //       setImageList((prevList) => prevList.filter((url) => url !== file.name));
  //     }
  //     const imageUrl = url.split("?")[0]; // URL without query params

  //     if (imageUrl) {
  //       console.log(imageUrl, 'imageurl')
  //       editor.chain().focus().setImage({ src: imageUrl }).run();
  //       setImageList((prevList) => [...prevList, imageUrl]); // Add image URL to the list
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     alert("Failed to upload image. Please try again."); // Alert user on error
  //   }
  // };

  const handleImageUpload = useCallback(
    async (file) => {
      try {
        const data = {
          fileName: file.name,
          fileType: file.type,
        };
        const response = await axios.post(
          `http://localhost:8000/api/generate_presigned_url/`,
          data
        );
        const { url } = response.data;

        const responseAws = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        if (responseAws.status === 200) {
          alert("Image uploaded!"); // Alert user on success
        }

        const imageUrl = url.split("?")[0]; // URL without query params

        if (imageUrl) {
          console.log(imageUrl, "imageUrl");
          editor.chain().focus().setImage({ src: imageUrl }).run();
          setImageList((prevList) => [...prevList, imageUrl]); // Add image URL to the list
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again."); // Alert user on error
      }
    },
    [editor]
  ); // Add 'editor' as a dependency

  const handleImageDelete = useCallback(async (urlImage) => {
    try {
      const data = {
        imageUrl: urlImage,
      };
      const response = await axios.post(
        `http://localhost:8000/api/generate_delete_presigned_url/`,
        data
      );

      if (response.status === 200) {
        alert("Image deleted!"); // Alert user on success
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image. Please try again."); // Alert user on error
    }
  }, []); // No dependencies needed

  const addImage = useCallback(() => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        await handleImageUpload(file);
      }
    };
    fileInput.click();
  }, [handleImageUpload]); // handleImageUpload is now stable

  const deleteImage = useCallback(
    async (imageUrl) => {
      await handleImageDelete(imageUrl);
      editor.chain().focus().deleteSelection().run();
      setImageList((prevList) => prevList.filter((url) => url !== imageUrl)); // Remove image from list
    },
    [handleImageDelete, editor] // Include editor and handleImageDelete
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div className="border border-slate-300 rounded-lg p-5 sticky top-3 bg-white z-10 flex flex-wrap gap-2 shadow-lg">
        <button onClick={addImage} className="editor-btn">
          <CiImageOn className="text-lg" />
        </button>

        {/* Toolbar buttons for text formatting */}
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={`editor-btn ${
              editor.isActive("heading", { level }) && "active-editor-btn"
            }`}
          >
            H{level}
          </button>
        ))}

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`editor-btn ${
            editor.isActive("bold") && "active-editor-btn"
          }`}
        >
          <AiOutlineBold className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`editor-btn ${
            editor.isActive("italic") && "active-editor-btn"
          }`}
        >
          <AiOutlineItalic className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`editor-btn ${
            editor.isActive("strike") && "active-editor-btn"
          }`}
        >
          <AiOutlineStrikethrough className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`editor-btn ${
            editor.isActive("code") && "active-editor-btn"
          }`}
        >
          <FiCode className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="editor-btn"
        >
          <MdOutlineLayersClear className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="editor-btn"
        >
          <AiOutlineClose className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`editor-btn ${
            editor.isActive("paragraph") && "active-editor-btn"
          }`}
        >
          <BiParagraph className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`editor-btn ${
            editor.isActive("bulletList") && "active-editor-btn"
          }`}
        >
          <AiOutlineUnorderedList className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`editor-btn ${
            editor.isActive("orderedList") && "active-editor-btn"
          }`}
        >
          <AiOutlineOrderedList className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`editor-btn ${
            editor.isActive("codeBlock") && "active-editor-btn"
          }`}
        >
          <PiCodeBlock className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`editor-btn ${
            editor.isActive("blockquote") && "active-editor-btn"
          }`}
        >
          <PiQuotes className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="editor-btn"
        >
          <TbSpacingVertical className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="editor-btn"
        >
          <AiOutlineEnter className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="editor-btn"
        >
          <AiOutlineUndo className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="editor-btn"
        >
          <AiOutlineRedo className="text-lg" />
        </button>
      </div>

      <div className="prose max-w-2xl mx-auto mt-4">
        <EditorContent editor={editor} />
      </div>

      {/* Display uploaded images with delete option */}
      <div className="mt-4">
        <h3 className="font-semibold text-white text-lg">Uploaded Images</h3>
        <ul className="list-none">
          {imageList.map((imageUrl) => (
            <li
              key={imageUrl}
              className="flex justify-between items-center mt-2"
            >
              <div className="relative w-full h-64">
              <NextImage
                src={imageUrl}
                alt="upload"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
              <button
                onClick={() => deleteImage(imageUrl)}
                className="ml-2 text-red-500 hover:text-red-700 transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tiptap;

// const handleImageUpload = async (file) => {
//   try {
//     // Generate a pre-signed URL
//     // Upload the file to S3 using the pre-signed URL

//       const data = {
//         fileName: file.name,
//         fileType: file.type,
//       };
//       const response = await axios.post(
//         `http://localhost:8000/api/generate_presigned_url/`,
//         data
//       );
//       const { url } = response.data;

//       const responseAws = await axios.put(url, file, {
//         headers: {
//           "Content-Type": file.type,
//         },
//       });
//       if(responseAws.status===200){
//         alert("image uploaded !!"); // Alert user on error
//       }

//     const imageUrl = url.split("?")[0]; // URL without query params

//     if (imageUrl) {
//       console.log(imageUrl, 'imageurl')
//       editor.chain().focus().setImage({ src: imageUrl }).run();
//       setImageList((prevList) => [...prevList, imageUrl]); // Add image URL to the list
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     alert("Failed to upload image. Please try again."); // Alert user on error
//   }
// };

// // handle delete image
// const handleImageDelete = async (urlImage) => {
//   try {
//     // Generate a pre-signed URL
//     // Upload the file to S3 using the pre-signed URL

//       const data = {
//         imageUrl: urlImage
//       };
//       const response = await axios.post(
//         `http://localhost:8000/api/generate_delete_presigned_url/`,
//         data
//       );

//       if (response.status===200){
//         alert("image deleted !!"); // Alert user on error
//       }

//       // const { url } = response.data;

//       // await axios.delete(url, {
//       //   headers: {
//       //     "Content-Type": file.type,
//       //   },
//       // });

//     // const imageUrl = url.split("?")[0]; // URL without query params

//     } catch (error) {
//     console.error("Error uploading image:", error);
//     alert("Failed to upload image. Please try again."); // Alert user on error
//   }
// };

// const addImage = useCallback(() => {
//   const fileInput = document.createElement("input");
//   fileInput.type = "file";
//   fileInput.accept = "image/*";
//   fileInput.onchange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       await handleImageUpload(file);
//     }
//   };
//   fileInput.click();
// }, [editor, handleImageUpload]);

// const deleteImage = useCallback(
//  async (imageUrl) => {
//     await handleImageDelete(imageUrl);
//     editor.chain().focus().deleteSelection().run();
//     setImageList((prevList) => prevList.filter((url) => url !== imageUrl)); // Remove image from list
//   },
//   [editor]
// );
