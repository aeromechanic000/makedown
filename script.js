const { useState, useRef, useEffect } = React;

function SlideEditor() {
    const [slides, setSlides] = useState([
        { id: 1, content: `# Welcome to Makedown slides  
This is your first slide: 1) Edit markdown on the left; 2) See preview on the right

Best Practice Hint: Generate markdown slides with your favorite AI, and paste here.
\`\`\`
Generate a 10-page slide deck in Markdown format that introduces {TOPIC of YOUR SLIDES}. 
- Use simple, clear code examples on each slide. 
- Separate slides with ---.
- Do not use tables, since they may be confused with page breaks.
\`\`\`
        ` }
    ]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [mode, setMode] = useState('split'); // 'edit', 'preview', 'split'
    const [presentationMode, setPresentationMode] = useState(false);
    const [presentationSlideIndex, setPresentationSlideIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1); // Zoom state
    const [fontScale, setFontScale] = useState(1); // New font scale state
    const [isExporting, setIsExporting] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [draggedSlide, setDraggedSlide] = useState(null);
    const [dragOverSlide, setDragOverSlide] = useState(null);
    const [showFormatDropdown, setShowFormatDropdown] = useState(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const [showPasteModal, setShowPasteModal] = useState(false);
    const [pasteContent, setPasteContent] = useState('');
    const [uploadedImages, setUploadedImages] = useState(new Map()); // Store uploaded images
    const fileInputRef = useRef(null);
    const editorRef = useRef(null);
    const presentationSlideRef = useRef(null);

    const currentSlide = slides[currentSlideIndex];

    // Zoom functions
    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.1, 2.0)); // Max zoom 200%
    };

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.1, 0.5)); // Min zoom 50%
    };

    const resetZoom = () => {
        setZoomLevel(1);
    };

    // Font size functions
    const increaseFontSize = () => {
        setFontScale(prev => Math.min(prev + 0.1, 2.0)); // Max font scale 200%
    };

    const decreaseFontSize = () => {
        setFontScale(prev => Math.max(prev - 0.1, 0.5)); // Min font scale 50%
    };

    const resetFontSize = () => {
        setFontScale(1);
    };

    // Enhanced font scaling for presentation mode - improved scaling with better base sizes
    useEffect(() => {
        if (presentationSlideRef.current && presentationMode) {
            const slide = presentationSlideRef.current;
            
            // Apply enhanced font scaling for the new presentation styles
            const h1s = slide.querySelectorAll('h1');
            h1s.forEach(h1 => {
                h1.style.fontSize = `${4.5 * fontScale}rem`;
                h1.style.marginBottom = `${2 * fontScale}rem`;
                h1.style.color = 'transparent';
                h1.style.fontWeight = '900';
                h1.style.lineHeight = '1.05';
                h1.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e40af 40%, #3730a3 100%)';
                h1.style.webkitBackgroundClip = 'text';
                h1.style.webkitTextFillColor = 'transparent';
                h1.style.backgroundClip = 'text';
                h1.style.textShadow = '0 4px 8px rgba(30, 41, 59, 0.2)';
                h1.style.letterSpacing = '-0.03em';
                h1.style.textAlign = 'center';
                h1.style.paddingBottom = `${2 * fontScale}rem`;
            });
            
            const h2s = slide.querySelectorAll('h2');
            h2s.forEach(h2 => {
                h2.style.fontSize = `${3.5 * fontScale}rem`;
                h2.style.marginBottom = `${1.5 * fontScale}rem`;
                h2.style.color = '#0f172a';
                h2.style.fontWeight = '800';
                h2.style.lineHeight = '1.15';
                h2.style.paddingLeft = '2rem';
                h2.style.marginLeft = '-2rem';
            });
            
            const h3s = slide.querySelectorAll('h3');
            h3s.forEach(h3 => {
                h3.style.fontSize = `${2.75 * fontScale}rem`;
                h3.style.marginBottom = `${1.25 * fontScale}rem`;
                h3.style.color = '#1e293b';
                h3.style.fontWeight = '700';
                h3.style.lineHeight = '1.25';
                h3.style.paddingLeft = '2rem';
            });

            const h4s = slide.querySelectorAll('h4');
            h4s.forEach(h4 => {
                h4.style.fontSize = `${2.25 * fontScale}rem`;
                h4.style.marginBottom = `${1 * fontScale}rem`;
                h4.style.color = '#334155';
                h4.style.fontWeight = '650';
                h4.style.lineHeight = '1.3';
            });

            const h5s = slide.querySelectorAll('h5');
            h5s.forEach(h5 => {
                h5.style.fontSize = `${1.875 * fontScale}rem`;
                h5.style.marginBottom = `${0.875 * fontScale}rem`;
                h5.style.color = '#475569';
                h5.style.fontWeight = '600';
                h5.style.lineHeight = '1.35';
            });

            const h6s = slide.querySelectorAll('h6');
            h6s.forEach(h6 => {
                h6.style.fontSize = `${1.5 * fontScale}rem`;
                h6.style.marginBottom = `${0.75 * fontScale}rem`;
                h6.style.color = '#64748b';
                h6.style.fontWeight = '600';
                h6.style.lineHeight = '1.4';
            });
            
            const ps = slide.querySelectorAll('p');
            ps.forEach(p => {
                p.style.fontSize = `${1.875 * fontScale}rem`;
                p.style.marginBottom = `${1.75 * fontScale}rem`;
                p.style.lineHeight = '1.7';
                p.style.color = '#1e293b';
                p.style.textAlign = 'justify';
                p.style.textJustify = 'inter-word';
                p.style.fontWeight = '400';
                p.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.03)';
            });
            
            const lis = slide.querySelectorAll('li');
            lis.forEach(li => {
                li.style.fontSize = `${1.75 * fontScale}rem`;
                li.style.marginBottom = `${1.5 * fontScale}rem`;
                li.style.lineHeight = '1.65';
                li.style.color = '#1e293b';
                li.style.paddingLeft = '3.5rem';
            });
            
            const uls = slide.querySelectorAll('ul, ol');
            uls.forEach(ul => {
                ul.style.marginBottom = `${2.5 * fontScale}rem`;
                ul.style.paddingLeft = '0';
                ul.style.listStyle = 'none';
            });

            // Enhanced code styling
            const codes = slide.querySelectorAll('code');
            codes.forEach(code => {
                code.style.background = 'linear-gradient(135deg, #f8fafc, #f1f5f9)';
                code.style.padding = '0.4rem 0.8rem';
                code.style.borderRadius = '8px';
                code.style.fontFamily = "'SF Mono', Monaco, 'Consolas', 'Liberation Mono', 'Courier New', monospace";
                code.style.fontSize = `${1.4 * fontScale}rem`;
                code.style.color = '#334155';
                code.style.border = '1px solid #e2e8f0';
                code.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                code.style.fontWeight = '500';
                code.style.letterSpacing = '0.025em';
            });

            const pres = slide.querySelectorAll('pre');
            pres.forEach(pre => {
                pre.style.background = 'linear-gradient(135deg, #f8fafc, #f1f5f9)';
                pre.style.border = '2px solid #e2e8f0';
                pre.style.padding = '2.5rem';
                pre.style.borderRadius = '16px';
                pre.style.overflowX = 'auto';
                pre.style.margin = '3rem 0';
                pre.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
            });

            const preCode = slide.querySelectorAll('pre code');
            preCode.forEach(code => {
                code.style.background = 'none';
                code.style.padding = '0';
                code.style.color = '#334155';
                code.style.border = 'none';
                code.style.boxShadow = 'none';
                code.style.fontSize = `${1.25 * fontScale}rem`;
                code.style.lineHeight = '1.7';
                code.style.fontWeight = '500';
                code.style.letterSpacing = '0.025em';
                code.style.display = 'block';
            });

            // Enhanced blockquote styling
            const blockquotes = slide.querySelectorAll('blockquote');
            blockquotes.forEach(blockquote => {
                blockquote.style.border = 'none';
                blockquote.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
                blockquote.style.padding = '3rem';
                blockquote.style.margin = '3rem 0';
                blockquote.style.fontStyle = 'italic';
                blockquote.style.fontSize = `${1.75 * fontScale}rem`;
                blockquote.style.lineHeight = '1.6';
                blockquote.style.borderRadius = '24px';
                blockquote.style.boxShadow = '0 12px 24px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
                blockquote.style.borderLeft = '8px solid #3730a3';
                blockquote.style.color = '#0f172a';
            });

            // Enhanced table styling
            const tables = slide.querySelectorAll('table');
            tables.forEach(table => {
                table.style.width = '100%';
                table.style.borderCollapse = 'separate';
                table.style.borderSpacing = '0';
                table.style.margin = '3rem 0';
                table.style.borderRadius = '16px';
                table.style.overflow = 'hidden';
                table.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)';
                table.style.background = 'white';
            });

            const ths = slide.querySelectorAll('th');
            ths.forEach(th => {
                th.style.background = 'linear-gradient(135deg, #0f172a, #1e293b)';
                th.style.color = 'white';
                th.style.padding = '1.75rem 2rem';
                th.style.fontWeight = '700';
                th.style.fontSize = `${1.4 * fontScale}rem`;
                th.style.textAlign = 'left';
                th.style.textTransform = 'uppercase';
                th.style.letterSpacing = '0.05em';
                th.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
            });

            const tds = slide.querySelectorAll('td');
            tds.forEach(td => {
                td.style.padding = '1.5rem 2rem';
                td.style.borderBottom = '1px solid #e2e8f0';
                td.style.fontSize = `${1.3 * fontScale}rem`;
                td.style.color = '#1e293b';
                td.style.background = 'rgba(255, 255, 255, 0.9)';
            });

            // Enhanced image styling
            const imgs = slide.querySelectorAll('img');
            imgs.forEach(img => {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.borderRadius = '20px';
                img.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)';
                img.style.margin = '3rem auto';
                img.style.border = '3px solid rgba(255, 255, 255, 0.8)';
                img.style.display = 'block';
            });

            // Layout enhancements
            const imageLayouts = slide.querySelectorAll('.image-layout');
            imageLayouts.forEach(layout => {
                layout.style.display = 'flex';
                layout.style.gap = '3rem';
                layout.style.alignItems = 'flex-start';
                layout.style.margin = '3rem 0';
                layout.style.background = 'rgba(255, 255, 255, 0.4)';
                layout.style.padding = '2.5rem';
                layout.style.borderRadius = '20px';
                layout.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
                layout.style.backdropFilter = 'blur(10px)';
                layout.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            });

            // Apply enhanced text styling
            const strongs = slide.querySelectorAll('strong');
            strongs.forEach(strong => {
                strong.style.color = '#1e40af';
                strong.style.fontWeight = '700';
                strong.style.textShadow = '0 1px 2px rgba(30, 64, 175, 0.15)';
            });

            const ems = slide.querySelectorAll('em');
            ems.forEach(em => {
                em.style.color = '#7c3aed';
                em.style.fontStyle = 'italic';
                em.style.fontWeight = '500';
            });

            // Enhanced link styling
            const links = slide.querySelectorAll('a');
            links.forEach(link => {
                link.style.color = '#3730a3';
                link.style.textDecoration = 'none';
                link.style.fontWeight = '600';
                link.style.borderBottom = '2px solid transparent';
            });

            // Enhanced HR styling
            const hrs = slide.querySelectorAll('hr');
            hrs.forEach(hr => {
                hr.style.border = 'none';
                hr.style.height = '4px';
                hr.style.background = 'linear-gradient(90deg, transparent, #3730a3, transparent)';
                hr.style.margin = '4rem 0';
                hr.style.borderRadius = '2px';
                hr.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.2)';
            });
        }
    }, [fontScale, presentationMode, presentationSlideIndex, slides]);

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
            
            // Set cursor position after replacement
            setTimeout(() => {
                editorRef.current.focus();
                editorRef.current.setSelectionRange(start + newText.length, start + newText.length);
            }, 0);
        }
    };

    const removeFormat = (text) => {
        // Remove bold, italic, bold-italic formatting
        let cleaned = text;
        cleaned = cleaned.replace(/\*\*\*(.*?)\*\*\*/g, '$1'); // Bold italic
        cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1'); // Bold
        cleaned = cleaned.replace(/\*(.*?)\*/g, '$1'); // Italic
        cleaned = cleaned.replace(/<span style="color: [^"]*">(.*?)<\/span>/g, '$1'); // Color spans
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

    // Enhanced markdown renderer for better presentation
    const renderContent = (content) => {
        // First, replace image IDs with actual data URLs in the content
        let processedContent = content;
        
        uploadedImages.forEach((dataUrl, imageId) => {
            // Replace the image ID references with actual data URLs
            const regex = new RegExp(`!\\[([^\\]]*)\\]\\(${imageId}\\)`, 'g');
            processedContent = processedContent.replace(regex, `![${imageId}](${dataUrl})`);
        });
        
        // Parse with marked
        const html = marked.parse(processedContent);
        
        return html;
    };

    // Helper function to parse markdown content for PPTX export
    const parseMarkdownForPptx = (content) => {
        // Replace image IDs with actual data URLs
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

            // Headers
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
            // Bullet points
            else if (line.startsWith('- ') || line.startsWith('* ')) {
                if (!currentElement || currentElement.type !== 'bullet') {
                    currentElement = { type: 'bullet', items: [] };
                    elements.push(currentElement);
                }
                currentElement.items.push(line.replace(/^[*-] /, ''));
            }
            // Images
            else if (line.match(/!\[.*?\]\(.*?\)/)) {
                const match = line.match(/!\[.*?\]\((.*?)\)/);
                if (match) {
                    elements.push({
                        type: 'image',
                        src: match[1]
                    });
                }
            }
            // Regular text
            else if (!line.startsWith('<div') && !line.startsWith('</div>')) {
                // Handle bold and italic formatting
                let text = line;
                text = text.replace(/\*\*\*(.*?)\*\*\*/g, '$1'); // Bold italic
                text = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Bold
                text = text.replace(/\*(.*?)\*/g, '$1'); // Italic
                
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
            // Split content by --- or by multiple line breaks to detect slides
            let slideContents;
            
            if (pasteContent.includes('---')) {
                slideContents = pasteContent.split('---').map(content => content.trim()).filter(content => content);
            } else {
                // Try to split by double line breaks followed by headers
                const headerRegex = /\n\n(?=# )/g;
                slideContents = pasteContent.split(headerRegex).map(content => content.trim()).filter(content => content);
                
                // If no clear splits found, treat as single slide
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
            // Create markdown content with slide separators
            const markdownContent = slides.map((slide, index) => {
                // Add slide number comment for reference
                const slideHeader = `<!-- Slide ${index + 1} -->\n`;
                return slideHeader + slide.content;
            }).join('\n\n---\n\n');

            // Add metadata header
            const metadata = `---
title: "Makedown Presentation"
date: "${new Date().toISOString().split('T')[0]}"
slides: ${slides.length}
---

`;

            const fullContent = metadata + markdownContent;

            // Create and download the file
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
            
            // Set slide size to 16:9
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
                                    // For PPTX, we need to calculate image position based on available space
                                    const imageY = hasTitle ? 2.0 : 0.5;
                                    const availableHeight = 5.625 - imageY - 0.5; // Total height minus used space and margin
                                    
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

            // Save the presentation
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
        
        // Remove dragged item
        newSlides.splice(draggedSlide, 1);
        
        // Insert at new position
        const actualDropIndex = draggedSlide < dropIndex ? dropIndex - 1 : dropIndex;
        newSlides.splice(actualDropIndex, 0, draggedItem);
        
        setSlides(newSlides);
        
        // Update current slide index if needed
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
                // Generate complete presentation with title and ending
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
                
                // Split content by --- and create slides
                const slideContents = textResponse.split('---').map(content => content.trim()).filter(content => content);
                
                if (slideContents.length > 0) {
                    const newSlides = slideContents.map((content, index) => ({
                        id: Date.now() + index,
                        content: content
                    }));
                    
                    setSlides(newSlides);
                    setCurrentSlideIndex(0);
                } else {
                    // Fallback if splitting doesn't work
                    setSlides([{
                        id: Date.now(),
                        content: textResponse
                    }]);
                    setCurrentSlideIndex(0);
                }
            } else {
                // Generate single slide with better context
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

    // Enhanced PDF export for better presentation rendering
    const exportToPDF = async () => {
        setIsExporting(true);
        try {
            const { jsPDF } = window.jspdf;
            
            // Custom 16:9 format in mm (width x height)
            // Using 254mm x 143mm for proper 16:9 ratio
            const pageWidth = 254;
            const pageHeight = 143;
            
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [pageWidth, pageHeight]
            });
            
            for (let i = 0; i < slides.length; i++) {
                if (i > 0) pdf.addPage();
                
                // Create a temporary slide container matching the enhanced presentation
                const tempDiv = document.createElement('div');
                tempDiv.style.cssText = `
                    width: 1600px;
                    height: 900px;
                    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
                    padding: 80px;
                    box-sizing: border-box;
                    position: fixed;
                    top: -15000px;
                    left: -15000px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    overflow: hidden;
                `;
                
                tempDiv.innerHTML = renderContent(slides[i].content);
                
                // Apply enhanced styling matching the new presentation styles
                const h1s = tempDiv.querySelectorAll('h1');
                h1s.forEach(h1 => {
                    h1.style.cssText = 'font-size: 120px; margin-bottom: 60px; color: transparent; font-weight: 900; line-height: 1.05; background: linear-gradient(135deg, #0f172a 0%, #1e40af 40%, #3730a3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-align: center; letter-spacing: -0.03em;';
                });
                
                const h2s = tempDiv.querySelectorAll('h2');
                h2s.forEach(h2 => {
                    h2.style.cssText = 'font-size: 96px; margin-bottom: 48px; color: #0f172a; font-weight: 800; line-height: 1.15; padding-left: 2rem; margin-left: -2rem;';
                });
                
                const h3s = tempDiv.querySelectorAll('h3');
                h3s.forEach(h3 => {
                    h3.style.cssText = 'font-size: 72px; margin-bottom: 36px; color: #1e293b; font-weight: 700; line-height: 1.25; padding-left: 2rem;';
                });
                
                const ps = tempDiv.querySelectorAll('p');
                ps.forEach(p => {
                    p.style.cssText = 'font-size: 48px; margin-bottom: 48px; line-height: 1.7; color: #1e293b; text-align: justify;';
                });
                
                const lis = tempDiv.querySelectorAll('li');
                lis.forEach(li => {
                    li.style.cssText = 'font-size: 44px; margin-bottom: 36px; line-height: 1.65; color: #1e293b; padding-left: 80px;';
                });
                
                const uls = tempDiv.querySelectorAll('ul, ol');
                uls.forEach(ul => {
                    ul.style.cssText = 'margin-bottom: 60px; padding-left: 0; list-style: none;';
                });

                // Enhanced code styling for PDF
                const codes = tempDiv.querySelectorAll('code');
                codes.forEach(code => {
                    code.style.cssText = 'background: linear-gradient(135deg, #f8fafc, #f1f5f9); padding: 12px 16px; border-radius: 8px; font-family: Monaco, monospace; font-size: 36px; color: #334155; border: 1px solid #e2e8f0;';
                });

                const pres = tempDiv.querySelectorAll('pre');
                pres.forEach(pre => {
                    pre.style.cssText = 'background: linear-gradient(135deg, #f8fafc, #f1f5f9); border: 2px solid #e2e8f0; padding: 40px; border-radius: 16px; margin-bottom: 40px; overflow: hidden;';
                });

                // Enhanced blockquote styling
                const blockquotes = tempDiv.querySelectorAll('blockquote');
                blockquotes.forEach(blockquote => {
                    blockquote.style.cssText = 'background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 60px; margin: 60px 0; font-style: italic; font-size: 44px; border-radius: 24px; border-left: 8px solid #3730a3; color: #0f172a;';
                });

                // Style image layouts
                const imageLayouts = tempDiv.querySelectorAll('.image-layout');
                imageLayouts.forEach(layout => {
                    layout.style.cssText = 'display: flex; gap: 60px; align-items: flex-start; margin: 60px 0; background: rgba(255, 255, 255, 0.4); padding: 50px; border-radius: 20px;';
                });

                const imgs = tempDiv.querySelectorAll('img');
                imgs.forEach(img => {
                    img.style.cssText = 'max-width: 100%; height: auto; border-radius: 20px; margin: 60px auto; display: block; border: 3px solid rgba(255, 255, 255, 0.8);';
                });
                
                document.body.appendChild(tempDiv);
                
                try {
                    const canvas = await html2canvas(tempDiv, {
                        width: 1600,
                        height: 900,
                        scale: 1,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#ffffff'
                    });
                    
                    const imgData = canvas.toDataURL('image/png', 1.0);
                    // Add image to fill the entire 16:9 page
                    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
                } catch (error) {
                    console.error('Error rendering slide:', error);
                    // Fallback to text-based rendering with proper scaling
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
                
                document.body.removeChild(tempDiv);
            }
            
            pdf.save('makedown-slides-enhanced.pdf');
        } catch (error) {
            console.error('Error creating PDF:', error);
            alert('Error creating PDF. Please try again.');
        } finally {
            setIsExporting(false);
            setShowMenuDropdown(false);
        }
    };

    const exportToJSON = () => {
        const data = {
            slides: slides,
            uploadedImages: Array.from(uploadedImages.entries()), // Convert Map to array for JSON
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
                        
                        // Restore uploaded images if they exist
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
        setZoomLevel(1); // Reset zoom when starting presentation
        setFontScale(1); // Reset font scale when starting presentation
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
        setZoomLevel(1); // Reset zoom when exiting
        setFontScale(1); // Reset font scale when exiting
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setShowFormatDropdown(false);
                setShowMenuDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
                        increaseFontSize(); // Ctrl/Cmd + for font size
                    } else {
                        zoomIn(); // Just + for zoom
                    }
                } else if (e.key === '-') {
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        decreaseFontSize(); // Ctrl/Cmd - for font size
                    } else {
                        zoomOut(); // Just - for zoom
                    }
                } else if (e.key === '0') {
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        resetFontSize(); // Ctrl/Cmd 0 for font reset
                    } else {
                        resetZoom(); // Just 0 for zoom reset
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [presentationMode, presentationSlideIndex, zoomLevel, fontScale]);

    return (
        <div className="app">
            {/* Top Header */}
            <div className="top-header">
                <div className="header-main">
                    <div className="header-left">
                        <div className="app-title">
                            <div className="app-icon">M</div>
                            Makedown
                        </div>
                        <div className="mode-toggle">
                            <button
                                className={`mode-btn ${mode === 'edit' ? 'active' : ''}`}
                                onClick={() => setMode('edit')}
                            >
                                Edit
                            </button>
                            <button
                                className={`mode-btn ${mode === 'split' ? 'active' : ''}`}
                                onClick={() => setMode('split')}
                            >
                                Split
                            </button>
                            <button
                                className={`mode-btn ${mode === 'preview' ? 'active' : ''}`}
                                onClick={() => setMode('preview')}
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                    
                    <div className="header-right">
                        <div className="btn-group">
                            <button className="btn btn-primary" onClick={addSlide}>
                                Add Slide
                            </button>
                            <button 
                                className="btn btn-danger" 
                                onClick={deleteSlide} 
                                disabled={slides.length <= 1}
                            >
                                Delete
                            </button>
                            <button 
                                className="btn btn-paste" 
                                onClick={() => setShowPasteModal(true)}
                            >
                                Paste Slides
                            </button>
                            <div className={`dropdown ${showFormatDropdown ? 'active' : ''}`}>
                                <button 
                                    className="btn btn-format"
                                    onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                                >
                                    <svg className="format-icon" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 4v4h10.5a2.5 2.5 0 0 1 0 5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 15v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 20h-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Format
                                </button>
                                <div className="dropdown-content">
                                    <button className="dropdown-item" onClick={() => formatText('bold')}>
                                        <strong>B</strong>
                                        Bold
                                    </button>
                                    <button className="dropdown-item" onClick={() => formatText('italic')}>
                                        <em>I</em>
                                        Italic
                                    </button>
                                    <button className="dropdown-item" onClick={() => formatText('bold-italic')}>
                                        <strong><em>BI</em></strong>
                                        Bold Italic
                                    </button>
                                    <div className="format-section">
                                        <button className="dropdown-item" onClick={() => formatTextWithColor('#ef4444')}>
                                            <div className="color-option" style={{background: '#ef4444'}}></div>
                                            Red
                                        </button>
                                        <button className="dropdown-item" onClick={() => formatTextWithColor('#3b82f6')}>
                                            <div className="color-option" style={{background: '#3b82f6'}}></div>
                                            Blue
                                        </button>
                                        <button className="dropdown-item" onClick={() => formatTextWithColor('#10b981')}>
                                            <div className="color-option" style={{background: '#10b981'}}></div>
                                            Green
                                        </button>
                                        <button className="dropdown-item" onClick={() => formatTextWithColor('#f59e0b')}>
                                            <div className="color-option" style={{background: '#f59e0b'}}></div>
                                            Orange
                                        </button>
                                        <button className="dropdown-item" onClick={() => formatTextWithColor('#8b5cf6')}>
                                            <div className="color-option" style={{background: '#8b5cf6'}}></div>
                                            Purple
                                        </button>
                                    </div>
                                    <div className="format-section">
                                        <button className="dropdown-item" onClick={() => formatText('remove')}>
                                            ✂️
                                            Remove Format
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="btn-divider"></div>
                        
                        <div className="btn-group">
                            <button className="btn btn-success" onClick={startPresentation}>
                                Present
                            </button>
                            <button className="btn btn-github" onClick={openGitHubRepo}>
                                <svg className="github-icon" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                GitHub
                            </button>
                            <div className={`dropdown ${showMenuDropdown ? 'active' : ''}`}>
                                <button 
                                    className="btn btn-menu"
                                    onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                                >
                                    <svg className="menu-icon" viewBox="0 0 24 24" fill="none">
                                        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    Menu
                                </button>
                                <div className="dropdown-content">
                                    <button className="dropdown-item" onClick={exportToPDF} disabled={isExporting}>
                                        {isExporting ? 'Exporting...' : 'Export PDF'}
                                    </button>
                                    <button className="dropdown-item" onClick={exportToPPTX} disabled={isExporting}>
                                        {isExporting ? 'Exporting...' : 'Export PPTX'}
                                    </button>
                                    <button className="dropdown-item" onClick={exportToMarkdown}>
                                        Export Markdown
                                    </button>
                                    <button className="dropdown-item" onClick={exportToJSON}>
                                        Export JSON
                                    </button>
                                    <div className="format-section">
                                        <button className="dropdown-item" onClick={() => fileInputRef.current.click()}>
                                            Import JSON
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="header-ai">
                    <div className="ai-section">
                        <input
                            type="text"
                            className="ai-input"
                            placeholder="Enter detailed AI prompt to generate professional slide content..."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && generateWithAI(false)}
                        />
                        <button 
                            className="btn btn-ai btn-sm" 
                            onClick={() => generateWithAI(false)}
                            disabled={isGenerating}
                        >
                            {isGenerating ? 'Generating...' : 'Generate'}
                        </button>
                        <button 
                            className="btn btn-ai btn-sm" 
                            onClick={() => generateWithAI(true)}
                            disabled={isGenerating}
                        >
                            Full Deck
                        </button>
                    </div>
                </div>
            </div>

            <div className="main-container">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <div className="sidebar-title">
                            Slides ({slides.length}) - Slide {currentSlideIndex + 1}
                        </div>
                    </div>
                    
                    <div className="slides-list">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`slide-item ${index === currentSlideIndex ? 'active' : ''} ${
                                    draggedSlide === index ? 'dragging' : ''
                                } ${dragOverSlide === index ? 'drag-over' : ''}`}
                                onClick={() => setCurrentSlideIndex(index)}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDragEnter={(e) => handleDragEnter(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                <div className="drag-handle"></div>
                                <div className="slide-number">Slide {index + 1}</div>
                                <div className="slide-preview">
                                    {slide.content.substring(0, 100)}...
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="main-content">
                    <div className="content-area">
                        <div className={`editor-panel ${mode === 'preview' ? 'hidden' : ''}`}>
                            <textarea
                                ref={editorRef}
                                className="editor"
                                value={currentSlide?.content || ''}
                                onChange={(e) => updateSlideContent(e.target.value)}
                                placeholder="Enter your markdown content here..."
                            />
                        </div>

                        <div className={`preview-panel ${mode === 'edit' ? 'hidden' : ''}`}>
                            <div className="slide-preview-container">
                                <div className="slide-content">
                                    <div dangerouslySetInnerHTML={{
                                        __html: renderContent(currentSlide?.content || '')
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Paste Modal */}
            {showPasteModal && (
                <div className="paste-modal">
                    <div className="paste-modal-content">
                        <div className="paste-modal-header">
                            <h3 className="paste-modal-title">Paste Presentation Content</h3>
                            <button 
                                className="btn btn-sm" 
                                onClick={() => {
                                    setShowPasteModal(false);
                                    setPasteContent('');
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <textarea
                            className="paste-textarea"
                            value={pasteContent}
                            onChange={(e) => setPasteContent(e.target.value)}
                            placeholder="Paste your markdown presentation content here. Separate slides with --- or use headers to auto-detect slides."
                        />
                        <div className="paste-actions">
                            <button 
                                className="btn" 
                                onClick={() => {
                                    setShowPasteModal(false);
                                    setPasteContent('');
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-primary" 
                                onClick={pastePresentation}
                                disabled={!pasteContent.trim()}
                            >
                                Import Slides
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Presentation Mode */}
            {presentationMode && (
                <div className="presentation-mode">
                    <div className="presentation-container" style={{ transform: `scale(${zoomLevel})` }}>
                        <div 
                            ref={presentationSlideRef}
                            className="presentation-slide"
                        >
                            <div dangerouslySetInnerHTML={{
                                __html: renderContent(slides[presentationSlideIndex]?.content || '')
                            }} />
                        </div>
                    </div>
                    
                    {/* Enhanced Presentation Controls */}
                    <div className="presentation-controls">
                        {/* Zoom Controls */}
                        <div className="zoom-controls">
                            <button 
                                className="btn-zoom"
                                onClick={zoomOut}
                                disabled={zoomLevel <= 0.5}
                                title="Zoom Out (-)"
                            >
                                −
                            </button>
                            <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
                            <button 
                                className="btn-zoom"
                                onClick={zoomIn}
                                disabled={zoomLevel >= 2.0}
                                title="Zoom In (+)"
                            >
                                +
                            </button>
                            <button 
                                className="btn btn-sm"
                                onClick={resetZoom}
                                title="Reset Zoom (0)"
                            >
                                Reset
                            </button>
                        </div>

                        <button onClick={prevSlide} disabled={presentationSlideIndex === 0}>
                            Previous
                        </button>
                        <span className="slide-counter">
                            {presentationSlideIndex + 1} / {slides.length}
                        </span>
                        <button onClick={nextSlide} disabled={presentationSlideIndex === slides.length - 1}>
                            Next
                        </button>
                        <button onClick={exitPresentation}>
                            Exit
                        </button>
                        {/* Font Size Controls */}
                        <div className="font-controls">
                            <button 
                                className="btn-font"
                                onClick={decreaseFontSize}
                                disabled={fontScale <= 0.5}
                                title="Decrease Font Size (Ctrl+-)"
                            >
                                A-
                            </button>
                            <span className="font-level">{Math.round(fontScale * 100)}%</span>
                            <button 
                                className="btn-font"
                                onClick={increaseFontSize}
                                disabled={fontScale >= 2.0}
                                title="Increase Font Size (Ctrl++)"
                            >
                                A+
                            </button>
                            <button 
                                className="btn btn-sm"
                                onClick={resetFontSize}
                                title="Reset Font Size (Ctrl+0)"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={importFromJSON}
                className="file-input"
            />
        </div>
    );
}

// Updated to use React 18's createRoot API
const { createRoot } = ReactDOM;
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<SlideEditor />);