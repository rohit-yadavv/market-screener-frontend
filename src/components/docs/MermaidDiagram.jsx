import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Download,
  Hand,
  MousePointer
} from 'lucide-react';
import mermaid from 'mermaid';

export default function MermaidDiagram({ chart, title, className = "" }) {
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        width: '100%',
        height: '100%'
      }
    });

    const renderDiagram = async () => {
      try {
        setIsLoading(true);
        const { svg } = await mermaid.render(`mermaid-diagram-${Date.now()}`, chart);
        setSvgContent(svg);
      } catch (error) {
        console.error('Error rendering mermaid diagram:', error);
        setSvgContent('<div class="text-red-500 p-4 text-center">Error rendering diagram</div>');
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [chart]);

  const zoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.3));
  };

  const resetZoom = () => {
    setScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      // Reset pan when entering fullscreen
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const togglePanning = () => {
    setIsPanning(!isPanning);
  };

  const downloadSVG = () => {
    if (svgContent && !svgContent.includes('Error rendering diagram')) {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title || 'diagram'}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Panning handlers
  const handleMouseDown = (e) => {
    if (!isPanning) return;
    e.preventDefault();
    setLastPanPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isPanning || !lastPanPoint) return;
    e.preventDefault();
    
    const deltaX = e.clientX - lastPanPoint.x;
    const deltaY = e.clientY - lastPanPoint.y;
    
    setPanOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastPanPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setLastPanPoint(null);
  };

  // Wheel zoom
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(prev => Math.max(0.3, Math.min(3, prev * delta)));
    }
  };

  const containerClasses = isFullscreen 
    ? "fixed inset-0 z-50 bg-background p-4" 
    : "relative";

  return (
    <div className={containerClasses}>
      <Card className={`border-border ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-foreground">
              {title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={isPanning ? "default" : "outline"}
                size="sm"
                onClick={togglePanning}
                className="h-8 w-8 p-0"
                title={isPanning ? "Exit Pan Mode" : "Pan Mode"}
                disabled={isLoading}
              >
                {isPanning ? <MousePointer className="h-4 w-4" /> : <Hand className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                className="h-8 w-8 p-0"
                title="Zoom Out"
                disabled={isLoading}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                className="h-8 w-8 p-0"
                title="Zoom In"
                disabled={isLoading}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetZoom}
                className="h-8 w-8 p-0"
                title="Reset View"
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadSVG}
                className="h-8 w-8 p-0"
                title="Download SVG"
                disabled={isLoading || svgContent.includes('Error')}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="h-8 w-8 p-0"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            ref={containerRef}
            className={`border-t border-border bg-muted/20 ${
              isPanning ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
            }`}
            style={{ 
              minHeight: isFullscreen ? 'calc(100vh - 120px)' : '400px',
              maxHeight: isFullscreen ? 'calc(100vh - 120px)' : '600px',
              width: '100%',
              overflow: 'hidden'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">Loading diagram...</div>
              </div>
            ) : (
              <div
                ref={diagramRef}
                className="flex items-center justify-center p-6 w-full"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: isPanning ? 'none' : 'transform 0.2s ease-in-out',
                  minHeight: '100%',
                  width: '100%'
                }}
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                  className="w-full max-w-full"
                  style={{
                    minWidth: 'fit-content',
                    minHeight: 'fit-content',
                    maxWidth: '100%',
                    overflow: 'hidden'
                  }}
                />
              </div>
            )}
          </div>
          {!isFullscreen && (
            <div className="p-3 bg-muted/30 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>Zoom: {Math.round(scale * 100)}%</span>
                  {isPanning && (
                    <span className="text-blue-600 font-medium">Pan Mode Active</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>Ctrl+Scroll to zoom</span>
                  <span>•</span>
                  <span>Click hand tool to pan</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
