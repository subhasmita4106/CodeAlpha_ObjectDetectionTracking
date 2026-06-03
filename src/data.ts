/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Detection, SystemConfig, TelemetryState } from './types';

export const INITIAL_DETECTIONS: Detection[] = [
  {
    id: '042',
    type: 'Person',
    confidence: 0.984,
    timestamp: '2026-06-03 08:31:02',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5obvNg01s7hxMXrewsF6Qg6obmAbwP1SkfYXZjphmpTWDAcg3UCOg0CI4IweKP37WP0PDPbjkmk3T1ubEVQvK_bbxwYq6mfZqbwCpeefGGJW6OIWb3PAwlF1-QqWpfMK0riwkESz--y901l6qeCr2-NHlizZcDBE3tSnQ0EBaqPKKUhbGHjiD6hwpsACD7uWEMc-vdjzjAayfZWbYVjo0tK11VUh2GJ85ey6U4sEEpNlBrQ5d3Q9XSmyJANO149awKI90utTjHiYj',
    status: 'TRACKING',
    boundingBox: { top: 25, left: 30, width: 28, height: 42 }
  },
  {
    id: '109',
    type: 'Vehicle',
    confidence: 0.871,
    timestamp: '2026-06-03 08:41:15',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCxnuykDRDL6IyM64IsV2iqutZkQI2yTOIBqdgIgBx73WWR5BV4w37vVNWgYj9ecQXc4F_3wfNt-Q4mjPbuYO_IOBqiF5EkO4z9WQc4k8ywMpv21vQ_47QUXOvjgaNZ0GSvDhg-0kaYV5M5zQQh5VrTHrii2xH1S7juAeE3dH7oJnUSI-6koSILh_U5oPns9stArIws71o9BIOxH53cJTM7Y7fmpHHkd4-i9H7PRbd3yrU43SFLr7TmNRnvNbs_W6Uidc9992HepIr',
    status: 'TRACKING',
    boundingBox: { top: 52, left: 58, width: 34, height: 26 }
  },
  {
    id: '031',
    type: 'Animal',
    confidence: 0.42,
    timestamp: '2026-06-03 08:24:45',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdunuTZ_5XY5FsuuWW1pKdvFNblNCAi9-MFOu1F2d9AkbzoltSbTsY6DNpnyp8AxxQ-t-xUNM7N5Z64XvnOC9v0nMGLI5I-JisXsIU4K7wB5yGOATrw0O94UQvWGoITWlmafo11rFYj8LTu49Eo6dqQUT7EDjy2LPQ3MoQ1_0TyojrVGpyAa5jIYcuxZt0JAYY6DM7Ibkqn8e-LrE2svFvS8Xd5kq8RWCVXouFYGkgwg-mIqaDstGcMO4cavKSFsNxLm0FNn4Z40F9',
    status: 'LOST',
    boundingBox: { top: 15, left: 70, width: 14, height: 18 }
  },
  {
    id: '045',
    type: 'Person',
    confidence: 0.941,
    timestamp: '2026-06-03 08:42:30',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA42oymG-N6yN_mDLW1_NPY1hXYKTMMkUViesJ8mZQO1cN_u6ukKcwlvvEtD_3oENapQ8engfoFB9gdWYQIVwcuVn8a1jPPsrbix94-ohb4zDoGM_ra4ZLEkXkroyYW9nKbQzau3QzLC8ueYVK4ajQNR2nqP5Cc7PHOYT79fp0YrisDjydDaaZudAN0g5nSqkmNMb6fFqt1s-Mf6r1e84FoiV2_xX7hQHSiO8sEh6Ff3w7pdUnCXrNZfwTRl_NrwDUIZIXPbVtmnMNn',
    status: 'TRACKING',
    boundingBox: { top: 38, left: 12, width: 20, height: 38 }
  }
];

export const ARCHIVE_DETECTIONS: Detection[] = [
  {
    id: '4429',
    type: 'Truck',
    confidence: 0.98,
    timestamp: '2026-06-03 08:02:11',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMuPzXvpc6vEc7iDbxoU5X2JwbzKGMn-FNlNFnGK_4-vAAROl1CSifgHR8d9QVVPLTGCqKy58CUlF6R3qLA1IUQBFpVf_8XdMp9VSL5KOEn03rxy0z6QqnquSQJVaV0GA-i9OUmGv-7IVRIF-rCn42eiDa1zLPOhvC_No2zGV4iQGj2S3KMXBlrV-GASW25g8gFdaUQSYWJCY74XJPbCDKbP6cFspPEwgoqTvzpsh72e4d037kXHo96yZY4082B7hgzvZPGX-3C0Tv',
    status: 'TRACKING'
  },
  {
    id: '4430',
    type: 'Person',
    confidence: 0.92,
    timestamp: '2026-06-03 08:03:45',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZgBYYK--qh4m6sI6wo4sOThqC8oQmyDWOZAVg0FeR6Uw9Lanq4sQ9Q6LVqThYL1cqPtIZiQau3hbSkmZ3k5xKYR9k6Q6lEvw5kfjnj-7Fy0nrFZDTdsLJket88-ViOCSeyurSS67D8aleBpp1kVpFkB-ZB-uCV5wh6c4i0DC0346FGUQeJOmmbxKgSUNWxmfiElfOgw1S1OE1x20dzXp2yQqcNSYw9Mxtn1rwrLbugqDBC5c0osSCoJU8HV3qGB2afOJKvlJuvVs',
    status: 'LOST'
  },
  {
    id: '4431',
    type: 'Bicycle',
    confidence: 0.89,
    timestamp: '2026-06-03 08:05:22',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkiTr1NrH1tHb1l9ZXu5ui1mHdRvyiREpsAGKRDKO2Zx2RPY2EmruyyVcGHRDHkypv3InEr7R0o1Ecq9ZWLS3tcMK0czHL1JnbV-FJY2SgyeTbb-WGM72QqKxarC9fS3GWsE3hm3aUIGAJqaLBhxeaxbFnJBJ91y1aTAcxptiUBXbqgVTCY3vVAXgVroW6C7vv2XU9L0o6YWhpOPrf3G0vS8jhb4m6FIMIHOAF5HvH6K6BJWZMnqT1bcCJHFXcrDFUiPLy5CJOfFzL',
    status: 'ALERT'
  },
  {
    id: '4432',
    type: 'Car',
    confidence: 0.99,
    timestamp: '2026-06-03 08:08:01',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD514rLCeKh9_-h_Y_ZQeCa7dxSp5iA3DkhBo1qhO2do1P5sAlrf8GQ8WWuNOQsfQcXfNhyPjQ4oKwZq9-K2UGISiZ4CZK-OsTAhbsJmQHK_U2ueRYNSlG9JhkekQDun5beoMXI_BCv7vsden9KaqNECkBCizBJH_lNAQsqzw12sT9efQHciZi05rUHbOS8OaO_Upp_O0kYxa9lLbHWNcAwJgblmPKXwBoThVw314N409g17L1feXZWCjKTGDBJcklrqP0sKpzzRnyE',
    status: 'TRACKING'
  },
  {
    id: '4435',
    type: 'Person',
    confidence: 0.95,
    timestamp: '2026-06-03 08:12:14',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJlbknM1qvv1Wt9e60t76kEpXgVMim6q6_6I-hI_rHJMMTB4shBRKx3N09mYegIYakHw2IMEzYRvOCn326r7IU8t64Ahu3xFMtBl9UBQD91vRbwX6wFRhxwph4R6_LCpBcBI1bT42gJwURaInB7S2b-BJDYkWRCiQIQxkP4RavQ4J-zOodxdmk46199GwTs2bqyB0j37ASEt-bFjitAXWhDjYG5sotb3Siys_H_WXxIvJYU16hZZ_AdpHcIRniCEq5BEeEbGk_R__B',
    status: 'TRACKING'
  },
  {
    id: '4436',
    type: 'Package',
    confidence: 0.91,
    timestamp: '2026-06-03 08:15:39',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0uDyygFku6b-ZsHiW8w6zlcqpF21VqNjra0WpOuNy20O81eZa_NhJAKnL8EYLc7WnzBLq6oWfRvD-XcQ0DF7rn5Anz-FvwD4AbUHyb1Qjk5xzoAlUuFQhagXocFw5VC9770J6fvftuFRW0JtQx1vlJou3X28kfBzI06ilFMbZhmxgAzupzEIAlaAxVcTtbTpR5PtNYpGdeNhah-uvx2KkJ-k2E1klxo24BY-E8g8kXBScmxf9qp7XMOlqSa2c9wSWUmDoaTYUGkJB',
    status: 'TRACKING'
  }
];

export const HIGH_CONFIDENCE_CLIPS = [
  {
    id: 'VEHICLE_084',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu5XcKOMKp2dP-_zAQqHA4VZDZDr8O5VCjZzli8mlUNmYwZ-5XduuLdBEhvK9SCx6n8fBT_YOkI81w37H77xZT1WCoiJkDGqXT80e77HhB2oedQkWUEdmVNtQXBIQ2dcWPNWMmQdobRExgxX9fKLYwi2QtJoSRPHDsmSz7rypTc9ptXf1w2sjQVIyPQqqOa8-rxmWPsgbfduA-HPi0yEhUaq6DFLaXXcyai0zpv2i_geoCY7ouAFm2sRYz7IbI2tjm8VMm4ACTIPkI'
  },
  {
    id: 'PERSON_912',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJlbknM1qvv1Wt9e60t76kEpXgVMim6q6_6I-hI_rHJMMTB4shBRKx3N09mYegIYakHw2IMEzYRvOCn326r7IU8t64Ahu3xFMtBl9UBQD91vRbwX6wFRhxwph4R6_LCpBcBI1bT42gJwURaInB7S2b-BJDYkWRCiQIQxkP4RavQ4J-zOodxdmk46199GwTs2bqyB0j37ASEt-bFjitAXWhDjYG5sotb3Siys_H_WXxIvJYU16hZZ_AdpHcIRniCEq5BEeEbGk_R__B'
  },
  {
    id: 'PACKAGE_003',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0uDyygFku6b-ZsHiW8w6zlcqpF21VqNjra0WpOuNy20O81eZa_NhJAKnL8EYLc7WnzBLq6oWfRvD-XcQ0DF7rn5Anz-FvwD4AbUHyb1Qjk5xzoAlUuFQhagXocFw5VC9770J6fvftuFRW0JtQx1vlJou3X28kfBzI06ilFMbZhmxgAzupzEIAlaAxVcTtbTpR5PtNYpGdeNhah-uvx2KkJ-k2E1klxo24BY-E8g8kXBScmxf9qp7XMOlqSa2c9wSWUmDoaTYUGkJB'
  },
  {
    id: 'CROWD_LVL_02',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe6ybdjF69fXlBhXdEy2-IoMs6c8os8Xiv_Uyn4kVblwh7Fs0hKDoSmv7zX31QWeExJWGPSuQlnqHPD6Ee8s0uI4cy1Z2_c6Xbfb8fphWpy-rBJNQz6aW6ncK_4TpDp1R_QD9krn7MalL3N28FLrnjhpRD3LSwwV0Wlsr5WjkxEStRl47bgArzgHOKTYzXmq5OIAG1RLwBr7lqtZX1-MCA2X3fkadALZiOLW62Nu1QUT84osJpmv6OQwUxPv-UUS0x8jQkzsL-7UAq'
  }
];

export const HARDWARE_LOGS = [
  { level: 'SUCCESS', message: 'Neural Engine initialized on target YOLO_v8.' },
  { level: 'INFO', message: 'Input stream connected to MAIN_ENTRY_WEST' },
  { level: 'WARNING', message: 'Low contrast detected on outdoor evening cams' },
  { level: 'INFO', message: 'FPS bounded at stable 30.0 under regular workload.' },
  { level: 'SUCCESS', message: 'Warm reboot engine telemetry completed.' }
];
