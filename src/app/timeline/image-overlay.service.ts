import { Injectable, Inject } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TimelineComponent } from './timeline.component';

interface ImageOverlayServiceConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: ImageOverlayServiceConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable()
export class ImageOverlayService {

  constructor(
    private overlay: Overlay) { }

  open(config: ImageOverlayServiceConfig = {}) {

    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    console.log(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(TimelineComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);


    // Subscribe to a stream that emits when the backdrop was clicked
    overlayRef.backdropClick().subscribe(() => { overlayRef.dispose(); });
  }

  private createOverlay(config: ImageOverlayServiceConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: ImageOverlayServiceConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}