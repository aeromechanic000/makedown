const { useState, useRef, useEffect } = React;

// Color schemes for presentation mode
const COLOR_SCHEMES = {
    classic: {
        name: 'Classic Blue',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #1e293b 0%, #3730a3 40%, #1e40af 100%)',
        h1Color: '#1e293b',
        h2Color: '#1e293b',
        h3Color: '#1e293b',
        textColor: '#1e293b',
        accentColor: '#3730a3',
        secondaryAccent: '#1e40af',
        codeBackground: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        preBackground: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        preCodeColor: '#334155',
        blockquoteBackground: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        blockquoteBorder: '#3730a3',
        tableHeaderBackground: 'linear-gradient(135deg, #0f172a, #1e293b)',
        controlsBackground: 'rgba(15, 23, 42, 0.95)'
    },
    ocean: {
        name: 'Ocean Breeze',
        background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #075985 0%, #0284c7 40%, #0ea5e9 100%)',
        h1Color: '#075985',
        h2Color: '#0c4a6e',
        h3Color: '#075985',
        textColor: '#0c4a6e',
        accentColor: '#0284c7',
        secondaryAccent: '#0ea5e9',
        codeBackground: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
        preBackground: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
        preCodeColor: '#075985',
        blockquoteBackground: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
        blockquoteBorder: '#0284c7',
        tableHeaderBackground: 'linear-gradient(135deg, #0c4a6e, #075985)',
        controlsBackground: 'rgba(12, 74, 110, 0.95)'
    },
    forest: {
        name: 'Forest Green',
        background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #166534 0%, #16a34a 40%, #22c55e 100%)',
        h1Color: '#166534',
        h2Color: '#14532d',
        h3Color: '#166534',
        textColor: '#14532d',
        accentColor: '#16a34a',
        secondaryAccent: '#22c55e',
        codeBackground: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        preBackground: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        preCodeColor: '#166534',
        blockquoteBackground: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
        blockquoteBorder: '#16a34a',
        tableHeaderBackground: 'linear-gradient(135deg, #14532d, #166534)',
        controlsBackground: 'rgba(20, 83, 45, 0.95)'
    },
    sunset: {
        name: 'Sunset Orange',
        background: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #c2410c 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #9a3412 0%, #ea580c 40%, #f97316 100%)',
        h1Color: '#9a3412',
        h2Color: '#7c2d12',
        h3Color: '#9a3412',
        textColor: '#7c2d12',
        accentColor: '#ea580c',
        secondaryAccent: '#f97316',
        codeBackground: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
        preBackground: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
        preCodeColor: '#9a3412',
        blockquoteBackground: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        blockquoteBorder: '#ea580c',
        tableHeaderBackground: 'linear-gradient(135deg, #7c2d12, #9a3412)',
        controlsBackground: 'rgba(124, 45, 18, 0.95)'
    },
    purple: {
        name: 'Royal Purple',
        background: 'linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #7c3aed 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #6b21a8 0%, #7c3aed 40%, #8b5cf6 100%)',
        h1Color: '#6b21a8',
        h2Color: '#581c87',
        h3Color: '#6b21a8',
        textColor: '#581c87',
        accentColor: '#7c3aed',
        secondaryAccent: '#8b5cf6',
        codeBackground: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
        preBackground: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
        preCodeColor: '#6b21a8',
        blockquoteBackground: 'linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)',
        blockquoteBorder: '#7c3aed',
        tableHeaderBackground: 'linear-gradient(135deg, #581c87, #6b21a8)',
        controlsBackground: 'rgba(88, 28, 135, 0.95)'
    },
    ruby: {
        name: 'Ruby Red',
        background: 'linear-gradient(135deg, #881337 0%, #9f1239 50%, #be123c 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #9f1239 0%, #e11d48 40%, #f43f5e 100%)',
        h1Color: '#9f1239',
        h2Color: '#881337',
        h3Color: '#9f1239',
        textColor: '#881337',
        accentColor: '#e11d48',
        secondaryAccent: '#f43f5e',
        codeBackground: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
        preBackground: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
        preCodeColor: '#9f1239',
        blockquoteBackground: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        blockquoteBorder: '#e11d48',
        tableHeaderBackground: 'linear-gradient(135deg, #881337, #9f1239)',
        controlsBackground: 'rgba(136, 19, 55, 0.95)'
    },
    slate: {
        name: 'Slate Gray',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #334155 0%, #475569 40%, #64748b 100%)',
        h1Color: '#334155',
        h2Color: '#1e293b',
        h3Color: '#334155',
        textColor: '#1e293b',
        accentColor: '#475569',
        secondaryAccent: '#64748b',
        codeBackground: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        preBackground: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        preCodeColor: '#334155',
        blockquoteBackground: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        blockquoteBorder: '#475569',
        tableHeaderBackground: 'linear-gradient(135deg, #1e293b, #334155)',
        controlsBackground: 'rgba(30, 41, 59, 0.95)'
    },
    midnight: {
        name: 'Midnight Blue',
        background: 'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #1e40af 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #3b82f6 100%)',
        h1Color: '#1e3a8a',
        h2Color: '#172554',
        h3Color: '#1e3a8a',
        textColor: '#172554',
        accentColor: '#2563eb',
        secondaryAccent: '#3b82f6',
        codeBackground: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
        preBackground: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
        preCodeColor: '#1e3a8a',
        blockquoteBackground: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        blockquoteBorder: '#2563eb',
        tableHeaderBackground: 'linear-gradient(135deg, #172554, #1e3a8a)',
        controlsBackground: 'rgba(23, 37, 84, 0.95)'
    },
    emerald: {
        name: 'Emerald Mint',
        background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #047857 0%, #059669 40%, #10b981 100%)',
        h1Color: '#047857',
        h2Color: '#064e3b',
        h3Color: '#047857',
        textColor: '#064e3b',
        accentColor: '#059669',
        secondaryAccent: '#10b981',
        codeBackground: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
        preBackground: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
        preCodeColor: '#047857',
        blockquoteBackground: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
        blockquoteBorder: '#059669',
        tableHeaderBackground: 'linear-gradient(135deg, #064e3b, #047857)',
        controlsBackground: 'rgba(6, 78, 59, 0.95)'
    },
    amber: {
        name: 'Amber Gold',
        background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)',
        slideBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        h1Gradient: 'linear-gradient(135deg, #92400e 0%, #d97706 40%, #f59e0b 100%)',
        h1Color: '#92400e',
        h2Color: '#78350f',
        h3Color: '#92400e',
        textColor: '#78350f',
        accentColor: '#d97706',
        secondaryAccent: '#f59e0b',
        codeBackground: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
        preBackground: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
        preCodeColor: '#92400e',
        blockquoteBackground: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        blockquoteBorder: '#d97706',
        tableHeaderBackground: 'linear-gradient(135deg, #78350f, #92400e)',
        controlsBackground: 'rgba(120, 53, 15, 0.95)'
    }
};

function SlideEditor() {
    const [slides, setSlides] = useState([
        { id: 1, content: `# Welcome to Makedown slides  
This is your first slide: 1) Edit markdown on the left; 2) See preview on the right

Best Practice Hint: Generate markdown slides with your favorite AI, and paste here.
\`\`\`
Generate a 10-page slide deck in Markdown format that introduces {TOPIC of YOUR SLIDES}. 
- Separate slides with ---.
- Do not use tables, since they may be confused with page breaks.
\`\`\`
        ` }
    ]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [mode, setMode] = useState('split');
    const [presentationMode, setPresentationMode] = useState(false);
    const [presentationSlideIndex, setPresentationSlideIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [fontScale, setFontScale] = useState(1);
    const [isExporting, setIsExporting] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [draggedSlide, setDraggedSlide] = useState(null);
    const [dragOverSlide, setDragOverSlide] = useState(null);
    const [showFormatDropdown, setShowFormatDropdown] = useState(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const [showPasteModal, setShowPasteModal] = useState(false);
    const [pasteContent, setPasteContent] = useState('');
    const [uploadedImages, setUploadedImages] = useState(new Map());
    const [colorScheme, setColorScheme] = useState('classic');
    const [showThemeDropdown, setShowThemeDropdown] = useState(false);
    
    const fileInputRef = useRef(null);
    const editorRef = useRef(null);
    const presentationSlideRef = useRef(null);

    const currentSlide = slides[currentSlideIndex];

    // Zoom functions
    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
    };

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    };

    const resetZoom = () => {
        setZoomLevel(1);
    };

    // Font size functions
    const increaseFontSize = () => {
        setFontScale(prev => Math.min(prev + 0.1, 2.0));
    };

    const decreaseFontSize = () => {
        setFontScale(prev => Math.max(prev - 0.1, 0.5));
    };

    const resetFontSize = () => {
        setFontScale(1);
    };

    // Enhanced font scaling for presentation mode
    useEffect(() => {
        if (presentationSlideRef.current && presentationMode) {
            applyPresentationStyles(presentationSlideRef.current, fontScale);
        }
    }, [fontScale, presentationMode, presentationSlideIndex, slides, colorScheme]);

    const updateSlideContent = (content) => {
        setSlides(slides.map((slide, index) => 
            index === currentSlideIndex ? { ...slide, content } : slide
        ));
    };

    const addSlide = () => {
        const newSlide = {
            id: Date.now(),
            content: `# New Slide ${slides.length + 1}\n\nYour content here...`
        };
        setSlides([...slides, newSlide]);
        setCurrentSlideIndex(slides.length);
    };

    const deleteSlide = () => {
        if (slides.length > 1) {
            const newSlides = slides.filter((_, index) => index !== currentSlideIndex);
            setSlides(newSlides);
            setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
        }
    };

    // Text formatting functions
    const getSelectedText = () => {
        if (editorRef.current) {
            const start = editorRef.current.selectionStart;
            const end = editorRef.current.selectionEnd;
            return {
                text: editorRef.current.value.substring(start, end),
                start,
                end
            };
        }
        return { text: '', start: 0, end: 0 };
    };

    const replaceSelectedText = (newText) => {
        if (editorRef.current) {
            const start = editorRef.current.selectionStart;
            const end = editorRef.current.selectionEnd;
            const content = editorRef.current.value;
            const newContent = content.substring(0, start) + newText + content.substring(end);
            updateSlideContent(newContent);
            
            setTimeout(() => {
                editorRef.current.focus();
                editorRef.current.setSelectionRange(start + newText.length, start + newText.length);
            }, 0);
        }
    };

    const removeFormat = (text) => {
        let cleaned = text;
        cleaned = cleaned.replace(/\*\*\*(.*?)\*\*\*/g, '$1');
        cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1');
        cleaned = cleaned.replace(/\*(.*?)\*/g, '$1');
        cleaned = cleaned.replace(/<span style="color: [^"]*">(.*?)<\/span>/g, '$1');
        return cleaned;
    };

    const formatText = (type) => {
        const selection = getSelectedText();
        if (!selection.text) {
            alert('Please select text to format');
            return;
        }

        let formattedText = selection.text;
        
        if (type === 'remove') {
            formattedText = removeFormat(selection.text);
        } else {
            switch (type) {
                case 'bold':
                    formattedText = `**${selection.text}**`;
                    break;
                case 'italic':
                    formattedText = `*${selection.text}*`;
                    break;
                case 'bold-italic':
                    formattedText = `***${selection.text}***`;
                    break;
                default:
                    break;
            }
        }
        
        replaceSelectedText(formattedText);
        setShowFormatDropdown(false);
    };

    const formatTextWithColor = (color) => {
        const selection = getSelectedText();
        if (!selection.text) {
            alert('Please select text to format');
            return;
        }

        const formattedText = `<span style="color: ${color}">${selection.text}</span>`;
        replaceSelectedText(formattedText);
        setShowFormatDropdown(false);
    };

    // Enhanced markdown renderer
    const renderContent = (content) => {
        let processedContent = content;
        
        uploadedImages.forEach((dataUrl, imageId) => {
            const regex = new RegExp(`!\\[([^\\]]*)\\]\\(${imageId}\\)`, 'g');
            processedContent = processedContent.replace(regex, `![${imageId}](${dataUrl})`);
        });
        
        const html = marked.parse(processedContent);
        
        return html;
    };

    // Helper function to parse markdown content for PPTX export
    const parseMarkdownForPptx = (content) => {
        let processedContent = content;
        uploadedImages.forEach((dataUrl, imageId) => {
            const regex = new RegExp(`!\\[([^\\]]*)\\]\\(${imageId}\\)`, 'g');
            processedContent = processedContent.replace(regex, `![${imageId}](${dataUrl})`);
        });

        const lines = processedContent.split('\n');
        const elements = [];
        let currentElement = null;

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            if (line.startsWith('# ')) {
                elements.push({
                    type: 'title',
                    text: line.replace('# ', ''),
                    level: 1
                });
            } else if (line.startsWith('## ')) {
                elements.push({
                    type: 'title',
                    text: line.replace('## ', ''),
                    level: 2
                });
            } else if (line.startsWith('### ')) {
                elements.push({
                    type: 'title',
                    text: line.replace('### ', ''),
                    level: 3
                });
            }
            else if (line.startsWith('- ') || line.startsWith('* ')) {
                if (!currentElement || currentElement.type !== 'bullet') {
                    currentElement = { type: 'bullet', items: [] };
                    elements.push(currentElement);
                }
                currentElement.items.push(line.replace(/^[*-] /, ''));
            }
            else if (line.match(/!\[.*?\]\(.*?\)/)) {
                const match = line.match(/!\[.*?\]\((.*?)\)/);
                if (match) {
                    elements.push({
                        type: 'image',
                        src: match[1]
                    });
                }
            }
            else if (!line.startsWith('<div') && !line.startsWith('</div>')) {
                let text = line;
                text = text.replace(/\*\*\*(.*?)\*\*\*/g, '$1');
                text = text.replace(/\*\*(.*?)\*\*/g, '$1');
                text = text.replace(/\*(.*?)\*/g, '$1');
                
                elements.push({
                    type: 'text',
                    text: text
                });
                currentElement = null;
            }
        });

        return elements;
    };

    // Paste presentation function
    const pastePresentation = () => {
        if (!pasteContent.trim()) {
            alert('Please enter some content to paste');
            return;
        }

        try {
            let slideContents;
            
            if (pasteContent.includes('---')) {
                slideContents = pasteContent.split('---').map(content => content.trim()).filter(content => content);
            } else {
                const headerRegex = /\n\n(?=# )/g;
                slideContents = pasteContent.split(headerRegex).map(content => content.trim()).filter(content => content);
                
                if (slideContents.length <= 1) {
                    slideContents = [pasteContent.trim()];
                }
            }

            if (slideContents.length > 0) {
                const newSlides = slideContents.map((content, index) => ({
                    id: Date.now() + index,
                    content: content
                }));
                
                setSlides(newSlides);
                setCurrentSlideIndex(0);
                setShowPasteModal(false);
                setPasteContent('');
            }
        } catch (error) {
            alert('Error processing pasted content. Please check the format.');
            console.error('Paste error:', error);
        }
    };

    // Markdown Export function
    const exportToMarkdown = () => {
        try {
            const markdownContent = slides.map((slide, index) => {
                const slideHeader = `<!-- Slide ${index + 1} -->\n`;
                return slideHeader + slide.content;
            }).join('\n\n---\n\n');

            const metadata = `---
title: "Makedown Presentation"
date: "${new Date().toISOString().split('T')[0]}"
slides: ${slides.length}
---

`;

            const fullContent = metadata + markdownContent;

            const blob = new Blob([fullContent], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'makedown-slides.md';
            a.click();
            URL.revokeObjectURL(url);
            
            setShowMenuDropdown(false);
        } catch (error) {
            console.error('Error exporting markdown:', error);
            alert('Error creating markdown file. Please try again.');
        }
    };

    // PPTX Export function
    const exportToPPTX = async () => {
        setIsExporting(true);
        try {
            const pptx = new PptxGenJS();
            
            pptx.defineLayout({ name: 'LAYOUT_16x9', width: 10, height: 5.625 });
            pptx.layout = 'LAYOUT_16x9';

            for (let i = 0; i < slides.length; i++) {
                const slide = pptx.addSlide();
                const elements = parseMarkdownForPptx(slides[i].content);
                
                let yPosition = 0.5;
                let hasTitle = false;

                elements.forEach(element => {
                    switch (element.type) {
                        case 'title':
                            let fontSize = 44;
                            if (element.level === 2) fontSize = 36;
                            if (element.level === 3) fontSize = 28;
                            
                            slide.addText(element.text, {
                                x: 0.5,
                                y: yPosition,
                                w: 9,
                                h: 0.8,
                                fontSize: fontSize,
                                bold: true,
                                color: element.level === 1 ? '1e293b' : '374151',
                                fontFace: 'Arial'
                            });
                            yPosition += element.level === 1 ? 1.0 : 0.8;
                            hasTitle = true;
                            break;

                        case 'bullet':
                            const bulletText = element.items.map(item => `• ${item}`).join('\n');
                            slide.addText(bulletText, {
                                x: 0.5,
                                y: yPosition,
                                w: 9,
                                h: Math.min(element.items.length * 0.4, 3),
                                fontSize: 18,
                                color: '374151',
                                fontFace: 'Arial',
                                lineSpacing: 32
                            });
                            yPosition += Math.min(element.items.length * 0.4, 3) + 0.2;
                            break;

                        case 'text':
                            if (element.text.trim()) {
                                slide.addText(element.text, {
                                    x: 0.5,
                                    y: yPosition,
                                    w: 9,
                                    h: 0.6,
                                    fontSize: 16,
                                    color: '374151',
                                    fontFace: 'Arial'
                                });
                                yPosition += 0.7;
                            }
                            break;

                        case 'image':
                            if (element.src.startsWith('data:image')) {
                                try {
                                    const imageY = hasTitle ? 2.0 : 0.5;
                                    const availableHeight = 5.625 - imageY - 0.5;
                                    
                                    slide.addImage({
                                        data: element.src,
                                        x: 1,
                                        y: imageY,
                                        w: 4,
                                        h: Math.min(3, availableHeight),
                                        sizing: { type: 'contain', w: 4, h: Math.min(3, availableHeight) }
                                    });
                                } catch (error) {
                                    console.warn('Failed to add image to slide:', error);
                                }
                            }
                            break;
                    }
                });
            }

            await pptx.writeFile({ fileName: 'makedown-slides.pptx' });
            
        } catch (error) {
            console.error('Error creating PPTX:', error);
            alert('Error creating PPTX file. Please try again.');
        } finally {
            setIsExporting(false);
            setShowMenuDropdown(false);
        }
    };

    // Drag and drop handlers
    const handleDragStart = (e, index) => {
        setDraggedSlide(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.outerHTML);
        e.target.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '';
        setDraggedSlide(null);
        setDragOverSlide(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
        setDragOverSlide(index);
    };

    const handleDragLeave = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setDragOverSlide(null);
        }
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        
        if (draggedSlide === null || draggedSlide === dropIndex) {
            return;
        }

        const newSlides = [...slides];
        const draggedItem = newSlides[draggedSlide];
        
        newSlides.splice(draggedSlide, 1);
        
        const actualDropIndex = draggedSlide < dropIndex ? dropIndex - 1 : dropIndex;
        newSlides.splice(actualDropIndex, 0, draggedItem);
        
        setSlides(newSlides);
        
        if (currentSlideIndex === draggedSlide) {
            setCurrentSlideIndex(actualDropIndex);
        } else if (currentSlideIndex > draggedSlide && currentSlideIndex <= actualDropIndex) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        } else if (currentSlideIndex < draggedSlide && currentSlideIndex >= actualDropIndex) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
        
        setDraggedSlide(null);
        setDragOverSlide(null);
    };

    const generateWithAI = async (allSlides = false) => {
        if (!aiPrompt.trim()) {
            alert('Please enter a prompt for AI generation');
            return;
        }

        setIsGenerating(true);
        try {
            if (allSlides) {
                const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(`Create a complete presentation about: ${aiPrompt}. 

Start with a title slide containing:
- Main title with #
- Brief subtitle or description
- Author or date if relevant

Then create 4-6 content slides covering the main points with:
- Clear ## headings for each slide
- Bullet points with key information
- Relevant details and examples

End with a conclusion/thank you slide containing:
- Summary of key points
- Call to action or next steps
- Thank you message

Format each slide in markdown and separate slides with --- (three dashes). Make it comprehensive and professional.`)}`);
                const textResponse = await response.text();
                
                const slideContents = textResponse.split('---').map(content => content.trim()).filter(content => content);
                
                if (slideContents.length > 0) {
                    const newSlides = slideContents.map((content, index) => ({
                        id: Date.now() + index,
                        content: content
                    }));
                    
                    setSlides(newSlides);
                    setCurrentSlideIndex(0);
                } else {
                    setSlides([{
                        id: Date.now(),
                        content: textResponse
                    }]);
                    setCurrentSlideIndex(0);
                }
            } else {
                const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(`Create a 1 page professional presentation slide about: ${aiPrompt}. 

Include:
- A clear, compelling title using #
- 3-5 bullet points with key information
- Specific details and examples
- Professional formatting in markdown

Make it informative and visually appealing when rendered.`)}`);
                const textResponse = await response.text();
                
                updateSlideContent(textResponse);
            }
            setAiPrompt('');
        } catch (error) {
            console.error('AI generation error:', error);
            alert('Failed to generate content. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Enhanced PDF export
    const exportToPDF = async () => {
        setIsExporting(true);
        try {
            const { jsPDF } = window.jspdf;
            
            const pageWidth = 254;
            const pageHeight = 143;
            
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [pageWidth, pageHeight]
            });
            
            for (let i = 0; i < slides.length; i++) {
                if (i > 0) pdf.addPage();
                
                const tempContainer = document.createElement('div');
                tempContainer.style.cssText = `
                    position: fixed;
                    top: -20000px;
                    left: -20000px;
                    width: 1600px;
                    height: 900px;
                    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
                    border-radius: 24px;
                    padding: 64px;
                    box-sizing: border-box;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
                
                tempContainer.innerHTML = renderContent(slides[i].content);
                document.body.appendChild(tempContainer);
                
                applyPresentationStyles(tempContainer, 1);
                
                try {
                    const canvas = await html2canvas(tempContainer, {
                        width: 1600,
                        height: 900,
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: null,
                        logging: false
                    });
                    
                    const imgData = canvas.toDataURL('image/png', 1.0);
                    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, '', 'FAST');
                } catch (error) {
                    console.error('Error rendering slide:', error);
                    pdf.setFontSize(20);
                    pdf.text(`Slide ${i + 1}`, 20, 25);
                    pdf.setFontSize(14);
                    const lines = slides[i].content.split('\n');
                    let yPos = 40;
                    lines.forEach(line => {
                        if (yPos < pageHeight - 20) {
                            const wrappedLines = pdf.splitTextToSize(line, pageWidth - 40);
                            pdf.text(wrappedLines, 20, yPos);
                            yPos += wrappedLines.length * 8;
                        }
                    });
                }
                
                document.body.removeChild(tempContainer);
            }
            
            pdf.save('makedown-slides.pdf');
        } catch (error) {
            console.error('Error creating PDF:', error);
            alert('Error creating PDF. Please try again.');
        } finally {
            setIsExporting(false);
            setShowMenuDropdown(false);
        }
    };

    // Helper function to apply presentation styles
    const applyPresentationStyles = (container, fontScale) => {
        const theme = COLOR_SCHEMES[colorScheme];
        
        if (presentationMode) {
            const presentationContainer = document.querySelector('.presentation-mode');
            if (presentationContainer) {
                presentationContainer.style.background = theme.background;
            }
            
            const presentationSlide = document.querySelector('.presentation-slide');
            if (presentationSlide) {
                presentationSlide.style.background = theme.slideBackground;
            }
            
            const controls = document.querySelector('.presentation-controls');
            if (controls) {
                controls.style.background = theme.controlsBackground;
            }
        }
        
        // H1 styling
        const h1s = container.querySelectorAll('h1');
        h1s.forEach(h1 => {
            h1.style.fontSize = `${4.5 * fontScale}rem`;
            h1.style.marginBottom = `${2 * fontScale}rem`;
            // h1.style.background = theme.h1Gradient;
            h1.style.fontWeight = '900';
            h1.style.lineHeight = '1.05';
            h1.style.webkitBackgroundClip = 'text';
            h1.style.webkitTextFillColor = 'transparent';
            h1.style.backgroundClip = 'text';
            h1.style.letterSpacing = '-0.03em';
            h1.style.textAlign = 'center';
            h1.style.paddingBottom = `${2 * fontScale}rem`;
            h1.style.position = 'relative';
            const existingAccent = h1.querySelector('.h1-accent');
            if (!existingAccent) {
                const accent = document.createElement('div');
                accent.className = 'h1-accent';
                accent.style.cssText = `
                    position: absolute;
                    bottom: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 120px;
                    height: 6px;
                    background: linear-gradient(90deg, ${theme.accentColor}, ${theme.secondaryAccent});
                    border-radius: 3px;
                    box-shadow: 0 2px 8px ${theme.accentColor}66;
                `;
                h1.style.position = 'relative';
                h1.appendChild(accent);
            } else {
                // Update existing accent with new theme colors
                existingAccent.style.background = `linear-gradient(90deg, ${theme.accentColor}, ${theme.secondaryAccent})`;
                existingAccent.style.boxShadow = `0 2px 8px ${theme.accentColor}66`;
            }
        });
        
        // H2 styling
        const h2s = container.querySelectorAll('h2');
        h2s.forEach(h2 => {
            h2.style.fontSize = `${3.5 * fontScale}rem`;
            h2.style.marginBottom = `${1.5 * fontScale}rem`;
            h2.style.color = theme.h2Color;
            h2.style.fontWeight = '800';
            h2.style.lineHeight = '1.15';
            h2.style.paddingLeft = '2rem';
            h2.style.marginLeft = '-2rem';
            h2.style.position = 'relative';
        });
        
        // H3 styling
        const h3s = container.querySelectorAll('h3');
        h3s.forEach(h3 => {
            h3.style.fontSize = `${2.75 * fontScale}rem`;
            h3.style.marginBottom = `${1.25 * fontScale}rem`;
            h3.style.color = theme.h3Color;
            h3.style.fontWeight = '700';
            h3.style.lineHeight = '1.25';
            h3.style.paddingLeft = '2rem';
            h3.style.position = 'relative';
        });

        // H4-H6 styling
        const h4s = container.querySelectorAll('h4');
        h4s.forEach(h4 => {
            h4.style.fontSize = `${2.25 * fontScale}rem`;
            h4.style.marginBottom = `${1 * fontScale}rem`;
            h4.style.color = theme.h3Color;
            h4.style.fontWeight = '650';
            h4.style.lineHeight = '1.3';
        });

        const h5s = container.querySelectorAll('h5');
        h5s.forEach(h5 => {
            h5.style.fontSize = `${1.875 * fontScale}rem`;
            h5.style.marginBottom = `${0.875 * fontScale}rem`;
            h5.style.color = theme.textColor;
            h5.style.fontWeight = '600';
            h5.style.lineHeight = '1.35';
        });

        const h6s = container.querySelectorAll('h6');
        h6s.forEach(h6 => {
            h6.style.fontSize = `${1.5 * fontScale}rem`;
            h6.style.marginBottom = `${0.75 * fontScale}rem`;
            h6.style.color = theme.textColor;
            h6.style.fontWeight = '600';
            h6.style.lineHeight = '1.4';
        });
        
        // Paragraph styling
        const ps = container.querySelectorAll('p');
        ps.forEach(p => {
            p.style.fontSize = `${1.875 * fontScale}rem`;
            p.style.marginBottom = `${1.75 * fontScale}rem`;
            p.style.lineHeight = '1.7';
            p.style.color = theme.textColor;
            p.style.textAlign = 'justify';
            p.style.textJustify = 'inter-word';
            p.style.fontWeight = '400';
        });
        
        // List item styling
        const lis = container.querySelectorAll('li');
        lis.forEach(li => {
            li.style.fontSize = `${1.75 * fontScale}rem`;
            li.style.marginBottom = `${1.5 * fontScale}rem`;
            li.style.lineHeight = '1.65';
            li.style.color = theme.textColor;
            li.style.paddingLeft = '3.5rem';
            li.style.position = 'relative';
        });
        
        // List container styling
        const uls = container.querySelectorAll('ul, ol');
        uls.forEach(ul => {
            ul.style.marginBottom = `${2.5 * fontScale}rem`;
            ul.style.paddingLeft = '0';
            ul.style.listStyle = 'none';
        });

        // Code styling
        const codes = container.querySelectorAll('code');
        codes.forEach(code => {
            if (!code.closest('pre')) {
                code.style.background = theme.codeBackground;
                code.style.padding = '0.4rem 0.8rem';
                code.style.borderRadius = '8px';
                code.style.fontFamily = "'SF Mono', Monaco, 'Consolas', 'Liberation Mono', 'Courier New', monospace";
                code.style.fontSize = `${1.4 * fontScale}rem`;
                code.style.color = theme.preCodeColor;
                code.style.border = `1px solid ${theme.accentColor}33`;
                code.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                code.style.fontWeight = '500';
            }
        });

        // Pre styling
        const pres = container.querySelectorAll('pre');
        pres.forEach(pre => {
            pre.style.background = theme.preBackground;
            pre.style.border = `2px solid ${theme.accentColor}33`;
            pre.style.padding = '2.5rem';
            pre.style.borderRadius = '16px';
            pre.style.overflowX = 'auto';
            pre.style.margin = '3rem 0';
            pre.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
        });

        const preCode = container.querySelectorAll('pre code');
        preCode.forEach(code => {
            code.style.background = 'none';
            code.style.padding = '0';
            code.style.color = theme.preCodeColor;
            code.style.border = 'none';
            code.style.boxShadow = 'none';
            code.style.fontSize = `${1.25 * fontScale}rem`;
            code.style.lineHeight = '1.7';
            code.style.fontWeight = '500';
        });

        // Blockquote styling
        const blockquotes = container.querySelectorAll('blockquote');
        blockquotes.forEach(blockquote => {
            blockquote.style.border = 'none';
            blockquote.style.background = theme.blockquoteBackground;
            blockquote.style.padding = '3rem';
            blockquote.style.margin = '3rem 0';
            blockquote.style.fontStyle = 'italic';
            blockquote.style.fontSize = `${1.75 * fontScale}rem`;
            blockquote.style.lineHeight = '1.6';
            blockquote.style.borderRadius = '24px';
            blockquote.style.boxShadow = `0 12px 24px ${theme.accentColor}33`;
            blockquote.style.borderLeft = `8px solid ${theme.blockquoteBorder}`;
            blockquote.style.color = theme.textColor;
        });

        // Table styling
        const tables = container.querySelectorAll('table');
        tables.forEach(table => {
            table.style.width = '100%';
            table.style.borderCollapse = 'separate';
            table.style.borderSpacing = '0';
            table.style.margin = '3rem 0';
            table.style.borderRadius = '16px';
            table.style.overflow = 'hidden';
            table.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
        });

        const ths = container.querySelectorAll('th');
        ths.forEach(th => {
            th.style.background = theme.tableHeaderBackground;
            th.style.color = 'white';
            th.style.padding = '1.75rem 2rem';
            th.style.fontWeight = '700';
            th.style.fontSize = `${1.4 * fontScale}rem`;
            th.style.textAlign = 'left';
        });

        const tds = container.querySelectorAll('td');
        tds.forEach(td => {
            td.style.padding = '1.5rem 2rem';
            td.style.borderBottom = `1px solid ${theme.accentColor}22`;
            td.style.fontSize = `${1.3 * fontScale}rem`;
            td.style.color = theme.textColor;
        });

        // Strong and em
        const strongs = container.querySelectorAll('strong');
        strongs.forEach(strong => {
            strong.style.color = theme.accentColor;
            strong.style.fontWeight = '700';
        });

        const ems = container.querySelectorAll('em');
        ems.forEach(em => {
            em.style.color = theme.secondaryAccent;
            em.style.fontStyle = 'italic';
            em.style.fontWeight = '500';
        });

        // Links
        const links = container.querySelectorAll('a');
        links.forEach(link => {
            link.style.color = theme.accentColor;
            link.style.textDecoration = 'none';
            link.style.fontWeight = '600';
        });

        // HR
        const hrs = container.querySelectorAll('hr');
        hrs.forEach(hr => {
            hr.style.border = 'none';
            hr.style.height = '4px';
            hr.style.background = `linear-gradient(90deg, transparent, ${theme.accentColor}, transparent)`;
            hr.style.margin = '4rem 0';
            hr.style.borderRadius = '2px';
        });

        // Images
        const imgs = container.querySelectorAll('img');
        imgs.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.borderRadius = '20px';
            img.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            img.style.margin = '3rem auto';
            img.style.border = '3px solid rgba(255, 255, 255, 0.8)';
            img.style.display = 'block';
        });

        // Image layouts
        const imageLayouts = container.querySelectorAll('.image-layout');
        imageLayouts.forEach(layout => {
            layout.style.display = 'flex';
            layout.style.gap = '3rem';
            layout.style.alignItems = 'flex-start';
            layout.style.margin = '3rem 0';
            layout.style.background = 'rgba(255, 255, 255, 0.4)';
            layout.style.padding = '2.5rem';
            layout.style.borderRadius = '20px';
            layout.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
        });
    };
    
    const exportToJSON = () => {
        const data = {
            slides: slides,
            uploadedImages: Array.from(uploadedImages.entries()),
            metadata: {
                created: new Date().toISOString(),
                version: '1.0',
                title: 'Makedown'
            }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'makedown-slides.json';
        a.click();
        URL.revokeObjectURL(url);
        setShowMenuDropdown(false);
    };

    const importFromJSON = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.slides && Array.isArray(data.slides)) {
                        setSlides(data.slides);
                        setCurrentSlideIndex(0);
                        
                        if (data.uploadedImages && Array.isArray(data.uploadedImages)) {
                            setUploadedImages(new Map(data.uploadedImages));
                        }
                    } else {
                        alert('Invalid JSON format. Please select a valid slides file.');
                    }
                } catch (error) {
                    alert('Error parsing JSON file. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
        event.target.value = '';
        setShowMenuDropdown(false);
    };

    const openGitHubRepo = () => {
        window.open('https://github.com/aeromechanic000/makedown', '_blank');
    };

    const startPresentation = () => {
        setPresentationMode(true);
        setPresentationSlideIndex(currentSlideIndex);
        setZoomLevel(1);
        setFontScale(1);
    };

    const nextSlide = () => {
        if (presentationSlideIndex < slides.length - 1) {
            setPresentationSlideIndex(presentationSlideIndex + 1);
        }
    };

    const prevSlide = () => {
        if (presentationSlideIndex > 0) {
            setPresentationSlideIndex(presentationSlideIndex - 1);
        }
    };

    const exitPresentation = () => {
        setPresentationMode(false);
        setZoomLevel(1);
        setFontScale(1);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setShowFormatDropdown(false);
                setShowMenuDropdown(false);
            }
            // Close theme dropdown in presentation mode
            if (presentationMode && showThemeDropdown && !event.target.closest('[data-theme-selector]')) {
                setShowThemeDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [presentationMode, showThemeDropdown]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (presentationMode) {
                if (e.key === 'ArrowRight' || e.key === ' ') {
                    nextSlide();
                } else if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'Escape') {
                    exitPresentation();
                } else if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        increaseFontSize();
                    } else {
                        zoomIn();
                    }
                } else if (e.key === '-') {
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        decreaseFontSize();
                    } else {
                        zoomOut();
                    }
                } else if (e.key === '0') {
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        resetFontSize();
                    } else {
                        resetZoom();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [presentationMode, presentationSlideIndex, zoomLevel, fontScale]);

    return React.createElement('div', { className: 'app' },
        // Top Header
        React.createElement('div', { className: 'top-header' },
            React.createElement('div', { className: 'header-main' },
                React.createElement('div', { className: 'header-left' },
                    React.createElement('div', { className: 'app-title' },
                        React.createElement('div', { className: 'app-icon' }, 'M'),
                        'Makedown'
                    ),
                    React.createElement('div', { className: 'mode-toggle' },
                        React.createElement('button', {
                            className: `mode-btn ${mode === 'edit' ? 'active' : ''}`,
                            onClick: () => setMode('edit')
                        }, 'Edit'),
                        React.createElement('button', {
                            className: `mode-btn ${mode === 'split' ? 'active' : ''}`,
                            onClick: () => setMode('split')
                        }, 'Split'),
                        React.createElement('button', {
                            className: `mode-btn ${mode === 'preview' ? 'active' : ''}`,
                            onClick: () => setMode('preview')
                        }, 'Preview')
                    )
                ),
                
                React.createElement('div', { className: 'header-right' },
                    React.createElement('div', { className: 'btn-group' },
                        React.createElement('button', { className: 'btn btn-primary', onClick: addSlide }, 'Add Slide'),
                        React.createElement('button', { 
                            className: 'btn btn-danger', 
                            onClick: deleteSlide,
                            disabled: slides.length <= 1
                        }, 'Delete'),
                        React.createElement('button', { 
                            className: 'btn btn-paste',
                            onClick: () => setShowPasteModal(true)
                        }, 'Paste Slides'),
                        React.createElement('div', { className: `dropdown ${showFormatDropdown ? 'active' : ''}` },
                            React.createElement('button', {
                                className: 'btn btn-format',
                                onClick: () => setShowFormatDropdown(!showFormatDropdown)
                            },
                                React.createElement('svg', { className: 'format-icon', viewBox: '0 0 24 24', fill: 'none' },
                                    React.createElement('path', { d: 'M6 4v4h10.5a2.5 2.5 0 0 1 0 5H6', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
                                    React.createElement('path', { d: 'M8 15v5', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
                                    React.createElement('path', { d: 'M15 20h-7', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' })
                                ),
                                'Format'
                            ),
                            React.createElement('div', { className: 'dropdown-content' },
                                React.createElement('button', { className: 'dropdown-item', onClick: () => formatText('bold') },
                                    React.createElement('strong', null, 'B'),
                                    'Bold'
                                ),
                                React.createElement('button', { className: 'dropdown-item', onClick: () => formatText('italic') },
                                    React.createElement('em', null, 'I'),
                                    'Italic'
                                ),
                                React.createElement('button', { className: 'dropdown-item', onClick: () => formatText('bold-italic') },
                                    React.createElement('strong', null, React.createElement('em', null, 'BI')),
                                    'Bold Italic'
                                ),
                                React.createElement('div', { className: 'format-section' },
                                    React.createElement('button', { className: 'dropdown-item', onClick: () => formatTextWithColor('#ef4444') },
                                        React.createElement('div', { className: 'color-option', style: { background: '#ef4444' } }),
                                        'Red'
                                    ),
                                    React.createElement('button', { className: 'dropdown-item', onClick: () => formatTextWithColor('#3b82f6') },
                                        React.createElement('div', { className: 'color-option', style: { background: '#3b82f6' } }),
                                        'Blue'
                                    ),
                                    React.createElement('button', { className: 'dropdown-item', onClick: () => formatTextWithColor('#10b981') },
                                        React.createElement('div', { className: 'color-option', style: { background: '#10b981' } }),
                                        'Green'
                                    ),
                                    React.createElement('button', { className: 'dropdown-item', onClick: () => formatTextWithColor('#f59e0b') },
                                        React.createElement('div', { className: 'color-option', style: { background: '#f59e0b' } }),
                                        'Orange'
                                    ),
                                    React.createElement('button', { className: 'dropdown-item', onClick: () => formatTextWithColor('#8b5cf6') },
                                        React.createElement('div', { className: 'color-option', style: { background: '#8b5cf6' } }),
                                        'Purple'
                                    )
                                ),
                                React.createElement('div', { className: 'format-section' },
                                    React.createElement('button', { className: 'dropdown-item', onClick: () => formatText('remove') },
                                        'Remove Format'
                                    )
                                )
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'btn-divider' }),
                    
                    React.createElement('div', { className: 'btn-group' },
                        React.createElement('button', { className: 'btn btn-success', onClick: startPresentation }, 'Present'),
                        React.createElement('button', { className: 'btn btn-github', onClick: openGitHubRepo },
                            React.createElement('svg', { className: 'github-icon', viewBox: '0 0 16 16' },
                                React.createElement('path', { d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' })
                            ),
                            'GitHub'
                        ),
                        React.createElement('div', { className: `dropdown ${showMenuDropdown ? 'active' : ''}` },
                            React.createElement('button', {
                                className: 'btn btn-menu',
                                onClick: () => setShowMenuDropdown(!showMenuDropdown)
                            },
                                React.createElement('svg', { className: 'menu-icon', viewBox: '0 0 24 24', fill: 'none' },
                                    React.createElement('line', { x1: '3', y1: '6', x2: '21', y2: '6', stroke: 'currentColor', strokeWidth: '2' }),
                                    React.createElement('line', { x1: '3', y1: '12', x2: '21', y2: '12', stroke: 'currentColor', strokeWidth: '2' }),
                                    React.createElement('line', { x1: '3', y1: '18', x2: '21', y2: '18', stroke: 'currentColor', strokeWidth: '2' })
                                ),
                                'Menu'
                            ),
                            React.createElement('div', { className: 'dropdown-content' },
                                React.createElement('button', { className: 'dropdown-item', onClick: exportToPDF, disabled: isExporting },
                                    isExporting ? 'Exporting...' : 'Export PDF'
                                ),
                                React.createElement('button', { className: 'dropdown-item', onClick: exportToPPTX, disabled: isExporting },
                                    isExporting ? 'Exporting...' : 'Export PPTX'
                                ),
                                React.createElement('button', { className: 'dropdown-item', onClick: exportToMarkdown },
                                    'Export Markdown'
                                ),
                                React.createElement('button', { className: 'dropdown-item', onClick: exportToJSON },
                                    'Export JSON'
                                ),
                                React.createElement('div', { className: 'format-section' },
                                    React.createElement('button', { className: 'dropdown-item', onClick: () => fileInputRef.current.click() },
                                        'Import JSON'
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            
            React.createElement('div', { className: 'header-ai' },
                React.createElement('div', { className: 'ai-section' },
                    React.createElement('input', {
                        type: 'text',
                        className: 'ai-input',
                        placeholder: 'Enter detailed AI prompt to generate professional slide content...',
                        value: aiPrompt,
                        onChange: (e) => setAiPrompt(e.target.value)
                    }),
                    React.createElement('button', {
                        className: 'btn btn-ai btn-sm',
                        onClick: () => generateWithAI(false),
                        disabled: isGenerating
                    }, isGenerating ? 'Generating...' : 'Generate'),
                    React.createElement('button', {
                        className: 'btn btn-ai btn-sm',
                        onClick: () => generateWithAI(true),
                        disabled: isGenerating
                    }, 'Full Deck')
                )
            )
        ),

        React.createElement('div', { className: 'main-container' },
            React.createElement('div', { className: 'sidebar' },
                React.createElement('div', { className: 'sidebar-header' },
                    React.createElement('div', { className: 'sidebar-title' },
                        `Slides (${slides.length}) - Slide ${currentSlideIndex + 1}`
                    )
                ),
                
                React.createElement('div', { className: 'slides-list' },
                    slides.map((slide, index) =>
                        React.createElement('div', {
                            key: slide.id,
                            className: `slide-item ${index === currentSlideIndex ? 'active' : ''} ${
                                draggedSlide === index ? 'dragging' : ''
                            } ${dragOverSlide === index ? 'drag-over' : ''}`,
                            onClick: () => setCurrentSlideIndex(index),
                            draggable: true,
                            onDragStart: (e) => handleDragStart(e, index),
                            onDragEnd: handleDragEnd,
                            onDragOver: handleDragOver,
                            onDragEnter: (e) => handleDragEnter(e, index),
                            onDragLeave: handleDragLeave,
                            onDrop: (e) => handleDrop(e, index)
                        },
                            React.createElement('div', { className: 'drag-handle' }),
                            React.createElement('div', { className: 'slide-number' }, `Slide ${index + 1}`),
                            React.createElement('div', { className: 'slide-preview' },
                                `${slide.content.substring(0, 100)}...`
                            )
                        )
                    )
                )
            ),

            React.createElement('div', { className: 'main-content' },
                React.createElement('div', { className: 'content-area' },
                    React.createElement('div', { className: `editor-panel ${mode === 'preview' ? 'hidden' : ''}` },
                        React.createElement('textarea', {
                            ref: editorRef,
                            className: 'editor',
                            value: currentSlide?.content || '',
                            onChange: (e) => updateSlideContent(e.target.value),
                            placeholder: 'Enter your markdown content here...'
                        })
                    ),

                    React.createElement('div', { className: `preview-panel ${mode === 'edit' ? 'hidden' : ''}` },
                        React.createElement('div', { className: 'slide-preview-container' },
                            React.createElement('div', { className: 'slide-content' },
                                React.createElement('div', {
                                    dangerouslySetInnerHTML: {
                                        __html: renderContent(currentSlide?.content || '')
                                    }
                                })
                            )
                        )
                    )
                )
            )
        ),

        // Paste Modal
        showPasteModal && React.createElement('div', { className: 'paste-modal' },
            React.createElement('div', { className: 'paste-modal-content' },
                React.createElement('div', { className: 'paste-modal-header' },
                    React.createElement('h3', { className: 'paste-modal-title' }, 'Paste Presentation Content'),
                    React.createElement('button', {
                        className: 'btn btn-sm',
                        onClick: () => {
                            setShowPasteModal(false);
                            setPasteContent('');
                        }
                    }, '✕')
                ),
                React.createElement('textarea', {
                    className: 'paste-textarea',
                    value: pasteContent,
                    onChange: (e) => setPasteContent(e.target.value),
                    placeholder: 'Paste your markdown presentation content here. Separate slides with --- or use headers to auto-detect slides.'
                }),
                React.createElement('div', { className: 'paste-actions' },
                    React.createElement('button', {
                        className: 'btn',
                        onClick: () => {
                            setShowPasteModal(false);
                            setPasteContent('');
                        }
                    }, 'Cancel'),
                    React.createElement('button', {
                        className: 'btn btn-primary',
                        onClick: pastePresentation,
                        disabled: !pasteContent.trim()
                    }, 'Import Slides')
                )
            )
        ),

        // Enhanced Presentation Mode with Theme Selector
        presentationMode && React.createElement('div', { className: 'presentation-mode' },
            React.createElement('div', { className: 'presentation-container', style: { transform: `scale(${zoomLevel})` } },
                React.createElement('div', {
                    ref: presentationSlideRef,
                    className: 'presentation-slide'
                },
                    React.createElement('div', {
                        dangerouslySetInnerHTML: {
                            __html: renderContent(slides[presentationSlideIndex]?.content || '')
                        }
                    })
                )
            ),
            
            // Enhanced Presentation Controls with Theme Selector
            React.createElement('div', { className: 'presentation-controls' },
                // Theme Selector
                React.createElement('div', { style: { position: 'relative'}, 'data-theme-selector': true },
                    React.createElement('button', {
                        onClick: () => setShowThemeDropdown(!showThemeDropdown),
                        style: {
                            background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            minWidth: '160px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#1e293b',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }
                    }, `${COLOR_SCHEMES[colorScheme].name}`),
                    
                    showThemeDropdown && React.createElement('div', {
                        style: {
                            position: 'absolute',
                            bottom: '120%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                            padding: '8px',
                            minWidth: '200px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            border: '1px solid #e5e7eb',
                            zIndex: '1000'
                        }
                    },
                        Object.entries(COLOR_SCHEMES).map(([key, scheme]) =>
                            React.createElement('button', {
                                key: key,
                                onClick: () => {
                                    setColorScheme(key);
                                    setShowThemeDropdown(false);
                                },
                                style: {
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: 'none',
                                    background: colorScheme === key ? scheme.slideBackground : 'white',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: colorScheme === key ? '600' : '400',
                                    color: scheme.textColor,
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '4px',
                                    transition: 'all 0.2s ease'
                                },
                                onMouseEnter: (e) => {
                                    if (colorScheme !== key) {
                                        e.target.style.background = '#f3f4f6';
                                    }
                                },
                                onMouseLeave: (e) => {
                                    if (colorScheme !== key) {
                                        e.target.style.background = 'white';
                                    }
                                }
                            },
                                React.createElement('div', {
                                    style: {
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '4px',
                                        background: scheme.h1Gradient,
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        flexShrink: 0
                                    }
                                }),
                                scheme.name
                            )
                        )
                    )
                ),

                React.createElement('div', { className: 'control-divider' }),

                // Zoom Controls
                React.createElement('div', { className: 'zoom-controls' },
                    React.createElement('button', {
                        className: 'btn-zoom',
                        onClick: zoomOut,
                        disabled: zoomLevel <= 0.5,
                        title: 'Zoom Out (-)'
                    }, '−'),
                    React.createElement('span', { className: 'zoom-level' }, `${Math.round(zoomLevel * 100)}%`),
                    React.createElement('button', {
                        className: 'btn-zoom',
                        onClick: zoomIn,
                        disabled: zoomLevel >= 2.0,
                        title: 'Zoom In (+)'
                    }, '+'),
                    React.createElement('button', {
                        className: 'btn btn-sm',
                        onClick: resetZoom,
                        title: 'Reset Zoom (0)'
                    }, 'Reset')
                ),

                React.createElement('div', { className: 'control-divider' }),

                React.createElement('button', {
                    onClick: prevSlide,
                    disabled: presentationSlideIndex === 0
                }, 'Previous'),
                React.createElement('span', { className: 'slide-counter' },
                    `${presentationSlideIndex + 1} / ${slides.length}`
                ),
                React.createElement('button', {
                    onClick: nextSlide,
                    disabled: presentationSlideIndex === slides.length - 1
                }, 'Next'),

                React.createElement('div', { className: 'control-divider' }),

                React.createElement('button', { onClick: exitPresentation }, 'Exit'),

                React.createElement('div', { className: 'control-divider' }),

                // Font Size Controls
                React.createElement('div', { className: 'font-controls' },
                    React.createElement('button', {
                        className: 'btn-font',
                        onClick: decreaseFontSize,
                        disabled: fontScale <= 0.5,
                        title: 'Decrease Font Size (Ctrl+-)'
                    }, 'A-'),
                    React.createElement('span', { className: 'font-level' }, `${Math.round(fontScale * 100)}%`),
                    React.createElement('button', {
                        className: 'btn-font',
                        onClick: increaseFontSize,
                        disabled: fontScale >= 2.0,
                        title: 'Increase Font Size (Ctrl++)'
                    }, 'A+'),
                    React.createElement('button', {
                        className: 'btn btn-sm',
                        onClick: resetFontSize,
                        title: 'Reset Font Size (Ctrl+0)'
                    }, 'Reset')
                )
            )
        ),

        React.createElement('input', {
            ref: fileInputRef,
            type: 'file',
            accept: '.json',
            onChange: importFromJSON,
            className: 'file-input'
        })
    );
}

// Updated to use React 18's createRoot API
const { createRoot } = ReactDOM;
const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(SlideEditor));