export function toSvgString(svgElement: SVGSVGElement): string {
  // Get the outer HTML of the SVG element
  const svgString = svgElement.outerHTML;

  // Ensure it starts with XML declaration if not present
  if (!svgString.startsWith("<?xml")) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n${svgString}`;
  }

  return svgString;
}

export function downloadSvg(svgString: string, filename = "map.svg"): void {
  // Create a blob with the SVG content
  const blob = new Blob([svgString], { type: "image/svg+xml" });

  // Create a temporary URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element and trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
