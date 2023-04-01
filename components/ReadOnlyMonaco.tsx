import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import draculaTheme from "../constants/DraculaTheme";

interface Props {
    language?: string;
    code: string;
}

const SimpleMonacoEditor = ({ language = "javascript", code }: Props) => {

    function setEditorTheme(monaco: any) {
        monaco.editor.defineTheme('dracula', draculaTheme);
    }

    return (
        <div style={{
            maxWidth: "658px",
            borderRadius: '1%',
            overflow: "hidden"
        }}>

            <Editor
                height="500px"
                defaultLanguage={language}
                beforeMount={setEditorTheme}
                value={code}
                theme="dracula"
                options={{ readOnly: true }}
            />
        </div>
    );
};

export default SimpleMonacoEditor;