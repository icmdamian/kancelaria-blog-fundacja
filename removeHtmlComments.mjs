export default function removeHtmlComments() {
  return {
    name: 'remove-html-comments',
    hooks: {
      'astro:build:done': async ({ dir, routes }) => {
        const fs = await import('fs');
        const path = await import('path');
        const { glob } = await import('glob');
        
        const htmlFiles = await glob('**/*.html', { cwd: dir.pathname });
        
        for (const file of htmlFiles) {
          const filePath = path.join(dir.pathname, file);
          let content = fs.readFileSync(filePath, 'utf-8');
          
          // Store script and style contents temporarily
          const scripts = [];
          const styles = [];
          
          // Replace script tags with placeholders
          content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (match, inner) => {
            scripts.push(match);
            return `<!--SCRIPT_PLACEHOLDER_${scripts.length - 1}-->`;
          });
          
          // Replace style tags with placeholders
          content = content.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (match, inner) => {
            styles.push(match);
            return `<!--STYLE_PLACEHOLDER_${styles.length - 1}-->`;
          });
          
          // Now safely remove HTML comments (but not our placeholders)
          content = content.replace(/<!--(?!DOCTYPE)(?!SCRIPT_PLACEHOLDER_)(?!STYLE_PLACEHOLDER_)[\s\S]*?-->/g, '');
          
          // Safe whitespace reduction (only between HTML tags)
          content = content.replace(/>\s+</g, '><');
          
          // Restore scripts and styles
          scripts.forEach((script, i) => {
            content = content.replace(`<!--SCRIPT_PLACEHOLDER_${i}-->`, script);
          });
          
          styles.forEach((style, i) => {
            content = content.replace(`<!--STYLE_PLACEHOLDER_${i}-->`, style);
          });
          
          fs.writeFileSync(filePath, content);
        }
        
        console.log(`✓ Safely optimized ${htmlFiles.length} HTML files`);
      }
    }
  };
}