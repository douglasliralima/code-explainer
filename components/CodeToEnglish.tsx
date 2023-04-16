import styles from '../styles/CodeToEnglish.module.css'
import React from 'react';
import Editor from "@monaco-editor/react";
import draculaTheme from "../constants/DraculaTheme";

interface Props {
    language?: string;
    code: string;
    setCode: (code: string) => void;
}

const CodeToEnglish = ({ language = "javascript", code, setCode }: Props) => {

    function setEditorTheme(monaco: any) {
        monaco.editor.defineTheme('dracula', draculaTheme);
    }

    function handleEditorChange(value: string | undefined) {
        setCode(value || '');
    }

    return (
        <div className={styles.translateToEnglish}>
            <div className={styles.monacoEditor}>
                <label className={styles.translateLabel}>Translate to:</label>
                <select className={styles.translateSelect}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                </select>
                <Editor
                    className={styles.editor}
                    height="658px"
                    defaultLanguage={language}
                    defaultValue={code}
                    beforeMount={setEditorTheme}
                    theme="dracula"
                    onChange={handleEditorChange}
                />
            </div>


            <div className={styles.outputBox}>
                <label className={styles.translateLabel}>Translate to:</label>
                <select className={styles.translateSelect}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                </select>
                <textarea disabled name="target-text" id="target-text" placeholder="Translation"></textarea>
            </div>
        </div >
    );
};

export default CodeToEnglish;