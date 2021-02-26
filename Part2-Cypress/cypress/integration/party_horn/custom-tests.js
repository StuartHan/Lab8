describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });



  /*===========================================================================
   * Test 1~3: Input, slider, and volume are linked
   *=========================================================================*/
  // Test 1: Volume input changes -> Slider changes
  it('Test 1: Slider changes when volume input changes', () => {
    // Set number
    cy.get('#volume-number').clear().type('75');
    // Check slider
    cy.get('#volume-slider').then(($el) => {
      expect($el).to.have.value(75);
    });
  });

  // Test 2: Slider changes -> Volume input changes
  it('Test 2: Volume input changes when slider changes', () => {
    // Set slider
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    // Check number
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(33);
    });
  });

  // Test 3: Slider changes -> Volume changes
  it('Test 3: Volume changes when slider changes', () => {
    // Change slider
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    // Check volume
    cy.get('audio').then(($el) => {
      expect($el).to.have.prop('volume', 0.33);
    });
  });
  /*===========================================================================
   * Test 1~3 Ends
   *=========================================================================*/



  /*===========================================================================
   * Test 4: Select party horn radio -> Image and sound change
   *=========================================================================*/
  it('Test 4: Image and sound sources change when party horn radio button is selected', () => {
    // Click Button
    cy.get('#radio-party-horn').click();
    // Check image
    cy.get('#sound-image').then(($el) => {
      expect($el).to.have.attr('src', './assets/media/images/party-horn.svg');
    });
    // Check Sound
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3');
    });
  });
  /*===========================================================================
   * Test 4 Ends
   *=========================================================================*/



  /*===========================================================================
   * Test 5: Different volumes -> Different volume images
   *=========================================================================*/
  it('Test 5: Volume image changes when increasing volumes', () => {
    // Test 5.1: volume = 0 -> Image = 0
    cy.get('#volume-number').clear().type('0');
    cy.get('#volume-image' ).then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-0.svg');
    });

    // Test 5.2: volume = 1~33 -> Image = 1
    // Volume = 1
    cy.get('#volume-number').clear().type('1');
    cy.get('#volume-image' ).then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg');
    });
    // Volume = 33
    cy.get('#volume-number').clear().type('33');
    cy.get('#volume-image' ).then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg');
    });

    // Test 5.3: volume = 34~66 -> Image = 2
    // Volume = 34
    cy.get('#volume-number').clear().type('34');
    cy.get('#volume-image' ).then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg');
    });
    // Volume = 66
    cy.get('#volume-number').clear().type('66');
    cy.get('#volume-image' ).then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg');
    });

    // Test 5.4: volume = 67~100 -> Image = 3
    // Volume = 67
    cy.get('#volume-number').clear().type('67');
    cy.get('#volume-image' ).then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg');
    });
    // Volume = 100
    cy.get('#volume-number').clear().type('100');
    cy.get('#volume-image' ).then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg');
    });
  });
  /*===========================================================================
   * Test 5 Ends
   *=========================================================================*/



  /*===========================================================================
   * Test 6: Textbox input is empty or a non-number -> Honk button is disabled
   *=========================================================================*/
  it('Test 6: Honk button is disabled when textbox input is empty or a non-number', () => {
    // Test 6.1: Textbox is empty
    cy.get('#volume-number').clear();
    cy.get('#honk-btn'     ).then(($el) => {
      expect($el).to.have.prop('disabled', true);
    });

    // Test 6.2: Textbox is a non-number
    cy.get('#volume-number').clear().type('non-number');
    cy.get('#honk-btn'     ).then(($el) => {
      expect($el).to.have.prop('disabled', true);
    });
  });
  /*===========================================================================
   * Test 6 Ends
   *=========================================================================*/



  /*===========================================================================
   * Test 7: Volume value out of range (<0 / >100) -> Error is shown
   *=========================================================================*/
  it('Test 7: An error is shown when typing a number outside of the given range for the volume textbox input', () => {
    // Test 7.1: Volume = -1
    cy.get('#volume-number'        ).clear().type('-1');
    cy.get('#volume-number:invalid').should('exist');
    cy.get('#volume-number'        ).then(($el) => {
      expect($el[0].validationMessage).to.eq('Value must be greater than or equal to 0.');
    });

    // Test 7.1: Volume = 101
    cy.get('#volume-number'        ).clear().type('101');
    cy.get('#volume-number:invalid').should('exist');
    cy.get('#volume-number'        ).then(($el) => {
      expect($el[0].validationMessage).to.eq('Value must be less than or equal to 100.');
    });
  });
  /*===========================================================================
   * Test 7 Ends
   *=========================================================================*/
});
