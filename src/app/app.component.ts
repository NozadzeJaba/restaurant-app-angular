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

      createChat({
        webhookUrl: 'http://localhost:5678/webhook/e7813db1-392c-4eca-a033-4d38864e1751/chat'
      });
    `;
    document.body.appendChild(script);
  }
}
