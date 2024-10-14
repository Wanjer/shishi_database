import { TestBed } from '@angular/core/testing';

import { ImageOverlayService } from './image-overlay.service';

describe('ImageOverlayService', () => {
  let service: ImageOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
