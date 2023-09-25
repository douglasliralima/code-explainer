'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/CodeTranslator.module.css'
import Editor from "@monaco-editor/react";
import draculaTheme from "../constants/DraculaTheme";
import { useCompletion } from 'ai/react';


const CodeToEnglish = () => {
      
    const [language, setLanguage] = useState('javascript');

    const [code, setCode] = useState('');

    const [idiom, setIdiom] = useState('en');


    const { completion, isLoading, setCompletion, complete } = useCompletion({
        api: 'api/translate',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    useEffect(() => {
        if (code !== '') {
            const timeout = setTimeout(() => {
                complete(`Explain this code using ${idiom} language:\n\n${code}`);
            }, 2000);

            return () => clearTimeout(timeout);
        } else {
            setCompletion('');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, complete]);

    function setEditorTheme(monaco: any) {
        monaco.editor.defineTheme('dracula', draculaTheme);
    }

    function handleEditorChange(value: string | undefined) {
        setCode(value || '');
    }

    function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setCode('');
        setCompletion('');
        setLanguage(event.target.value);
    }

    function handleIdiomChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setIdiom(event.target.value);
        complete(`Explain this code using ${event.target.value} language:\n\n${code}`);
    }

    return (
        <div className={styles.translateToEnglish}>
            <div className={styles.monacoEditor}>
                <label className={styles.translateLabel}>Translate from:</label>
                <select 
                    value={language} 
                    onChange={handleLanguageChange} 
                    className={styles.translateSelect}
                >
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
                <label className={styles.translateLabel}>To:</label>
                <select 
                    value={idiom} 
                    onChange={handleIdiomChange} 
                    className={styles.translateSelect}
                >
                    <option value="english">English</option>
                    <option value="mandarin">Mandarin</option>
                    <option value="hindi">Hindi</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="arabic">Arabic</option>
                    <option value="bengali">Bengali</option>
                    <option value="russian">Russian</option>
                    <option value="brazilian portuguese">Brazilian portuguese</option>
                    <option value="indonesian">Indonesian</option>
                </select>
                <textarea
                    name="target-text" 
                    id="target-text" 
                    placeholder={isLoading ? 'Translating...' : "Translation" } 
                    value={completion}
                    readOnly
                />
            </div>
        </div >
    );
};

export default CodeToEnglish;