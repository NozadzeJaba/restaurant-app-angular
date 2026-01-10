import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Initialize n8n chat widget
    this.initializeN8nChat();
  }

  private initializeN8nChat() {
    // Create and inject the script tag
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      const chatInstance = createChat({
        webhookUrl: 'http://localhost:5678/webhook/e7813db1-392c-4eca-a033-4d38864e1751/chat'
      });

      // Use MutationObserver to watch for chat widget insertion
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              // Check if this is the chat widget or contains it
              const chatWidget = node.querySelector?.('[data-n8n-chat]') ||
                                node.querySelector?.('iframe[src*="n8n"]') ||
                                node.querySelector?.('iframe[src*="chat"]') ||
                                (node.hasAttribute?.('data-n8n-chat') ? node : null) ||
                                (node.tagName === 'IFRAME' && (node.src?.includes('n8n') || node.src?.includes('chat')) ? node : null);

              if (chatWidget || node.style?.position === 'fixed') {
                applyChatWidgetStyles();
              }
            }
          });
        });
      });

      // Start observing
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Also apply styles after a delay as fallback
      setTimeout(() => {
        applyChatWidgetStyles();
      }, 2000);

      function applyChatWidgetStyles() {
        // Find all potential chat widget elements
        const selectors = [
          '[data-n8n-chat]',
          'iframe[src*="n8n"]',
          'iframe[src*="chat"]',
          'div[style*="position: fixed"][style*="bottom"]',
          'div[style*="position:fixed"][style*="bottom"]'
        ];

        selectors.forEach(selector => {
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.zIndex = '99999';
                el.style.pointerEvents = 'auto';
                el.style.position = 'fixed';
              }
            });
          } catch (e) {
            console.warn('Could not apply styles to:', selector, e);
          }
        });
      }
    `;
    document.body.appendChild(script);
  }
}
