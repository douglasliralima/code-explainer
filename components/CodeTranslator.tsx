import styles from '../styles/CodeToEnglish.module.css'
import React, { useCallback, useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import draculaTheme from "../constants/DraculaTheme";
import { getChatbotResponse } from '../service/ChatGptService';

const CodeToEnglish = () => {

    const [language, setLanguage] = useState('javascript');

    const [idiom, setIdiom] = useState('en');

    const [code, setCode] = useState('');

    const [translatedCode, setTranslatedCode] = useState('');

    const handleSubmit = useCallback(async () => {
        const translation = await getChatbotResponse(`Explain the code below using ${idiom} language:\n\n${code}`);
        setTranslatedCode(translation);
    }, [code, idiom])

    useEffect(() => {
        if (code !== '') {
            setTranslatedCode("Translating...");
            const timeout = setTimeout(() => {
                handleSubmit();
            }, 3000);

            return () => clearTimeout(timeout);
        } else {
            setTranslatedCode('');
        }
    }, [code, handleSubmit]);

    function setEditorTheme(monaco: any) {
        monaco.editor.defineTheme('dracula', draculaTheme);
    }

    function handleEditorChange(value: string | undefined) {
        setCode(value || '');
    }

    function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setCode('');
        setLanguage(event.target.value);
    }

    function handleIdiomChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setTranslatedCode('');
        setIdiom(event.target.value);
    }

    return (
        <div className={styles.translateToEnglish}>
            <div className={styles.monacoEditor}>
                <label className={styles.translateLabel}>Translate to:</label>
                <select value={language} onChange={handleLanguageChange} className={styles.translateSelect}>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
                <Editor
                    className={styles.editor}
                    height="658px"
                    language={language}
                    defaultValue={code}
                    beforeMount={setEditorTheme}
                    theme="dracula"
                    onChange={handleEditorChange}
                />
            </div>

            <div className={styles.outputBox}>
                <label className={styles.translateLabel}>Translate to:</label>
                <select value={idiom} onChange={handleIdiomChange} className={styles.translateSelect}>
                    <option value="english">English</option>
                    <option value="espanish">Spanish</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                    <option value="brazilian portuguese">Brazilian portuguese</option>
                </select>
                <textarea disabled name="target-text" id="target-text" placeholder="Translation" value={translatedCode}></textarea>
            </div>
        </div >
    );
};

export default CodeToEnglish;