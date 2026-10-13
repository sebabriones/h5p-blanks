var H5P = H5P || {};

H5P.BlanksCFRD = H5P.BlanksCFRD || {};

/**
 * Appearance defaults and CSS custom properties for Fill in the Blanks CFRD.
 */
H5P.BlanksCFRD.Appearance = (function () {
  function pick(value, fallback) {
    return (value === undefined || value === null || value === '') ?
      fallback :
      String(value);
  }

  function toNumber(value, fallback) {
    var num = (value !== undefined && value !== null && value !== '') ?
      Number(value) :
      Number(fallback);

    if (isNaN(num)) {
      num = Number(fallback);
    }

    return num;
  }

  function toEm(value, fallback) {
    return toNumber(value, fallback) + 'em';
  }

  function toUnitless(value, fallback) {
    return String(toNumber(value, fallback));
  }

  /**
   * @param {object} appearance
   * @returns {object}
   */
  function mergeAppearance(appearance) {
    var source = appearance || {};
    var text = source.text || {};
    var questionArea = source.questionArea || {};
    var border = questionArea.borderSettings || {};
    var blank = source.blank || {};
    var correct = source.correct || {};
    var wrong = source.wrong || {};
    var questionBorder = 'none';

    if (questionArea.useBorder === true) {
      questionBorder = toEm(border.borderWidth, 0.05) + ' solid ' + pick(border.borderColor, '#cccccc');
    }

    return {
      playAreaBackground: pick(source.playAreaBackground, '#ffffff'),
      questionColor: pick(text.question, '#333333'),
      questionFontSize: toEm(text.questionFontSize, 1),
      questionLineHeight: toUnitless(text.questionLineHeight, 1.75),
      contextColor: pick(text.context, '#555555'),
      contextFontSize: toEm(text.contextFontSize, 1),
      contextLineHeight: toUnitless(text.contextLineHeight, 1.5),
      questionBackground: pick(questionArea.background, 'transparent'),
      questionPadding: toEm(questionArea.padding, 0),
      questionRadius: toEm(questionArea.borderRadius, 0),
      questionBorder: questionBorder,
      inputBackground: pick(blank.background, '#ffffff'),
      inputColor: pick(blank.text, '#333333'),
      inputBorderColor: pick(blank.borderColor, '#a0a0a0'),
      inputBorderWidth: toNumber(blank.borderWidth, 1) + 'px',
      inputRadius: toEm(blank.borderRadius, 0.25),
      inputFocus: pick(blank.focusColor, '#6391CA'),
      inputEmptyBackground: pick(blank.emptyBackground, '#fff0f0'),
      correctBackground: pick(correct.background, '#9dd8bb'),
      correctColor: pick(correct.text, '#255c41'),
      correctIcon: pick(correct.icon, '#255c41'),
      wrongBackground: pick(wrong.background, '#f7d0d0'),
      wrongColor: pick(wrong.text, '#b71c1c'),
      wrongIcon: pick(wrong.icon, '#b71c1c'),
      solutionColor: pick(source.solutionColor, '#255c41'),
      tipColor: pick(source.tipColor, 'inherit')
    };
  }

  var CSS_VARS = {
    playAreaBackground: '--blanks-play-area-bg',
    questionColor: '--blanks-question-color',
    questionFontSize: '--blanks-question-font-size',
    questionLineHeight: '--blanks-question-line-height',
    contextColor: '--blanks-context-color',
    contextFontSize: '--blanks-context-font-size',
    contextLineHeight: '--blanks-context-line-height',
    questionBackground: '--blanks-question-bg',
    questionPadding: '--blanks-question-padding',
    questionRadius: '--blanks-question-radius',
    questionBorder: '--blanks-question-border',
    inputBackground: '--blanks-input-bg',
    inputColor: '--blanks-input-color',
    inputBorderColor: '--blanks-input-border-color',
    inputBorderWidth: '--blanks-input-border-width',
    inputRadius: '--blanks-input-radius',
    inputFocus: '--blanks-input-focus',
    inputEmptyBackground: '--blanks-input-empty-bg',
    correctBackground: '--blanks-correct-bg',
    correctColor: '--blanks-correct-color',
    correctIcon: '--blanks-correct-icon',
    wrongBackground: '--blanks-wrong-bg',
    wrongColor: '--blanks-wrong-color',
    wrongIcon: '--blanks-wrong-icon',
    solutionColor: '--blanks-solution-color',
    tipColor: '--blanks-tip-color'
  };

  /**
   * @param {H5P.jQuery} $container
   * @param {object} appearance
   */
  function applyAppearanceVars($container, appearance) {
    var merged = mergeAppearance(appearance);
    var i;
    var el;
    var key;

    if (!$container || !$container.length) {
      return merged;
    }

    for (i = 0; i < $container.length; i++) {
      el = $container[i];

      if (!el || !el.style) {
        continue;
      }

      for (key in CSS_VARS) {
        if (Object.prototype.hasOwnProperty.call(CSS_VARS, key)) {
          el.style.setProperty(CSS_VARS[key], merged[key]);
        }
      }

      if (el.classList && el.classList.contains('h5p-blanks-cfrd')) {
        el.style.backgroundColor = merged.playAreaBackground;
      }
    }

    return merged;
  }

  function scheduleAppearance($container, appearance) {
    var apply = function () {
      applyAppearanceVars($container, appearance);
    };

    apply();
    setTimeout(apply, 50);
  }

  return {
    mergeAppearance: mergeAppearance,
    applyAppearanceVars: applyAppearanceVars,
    scheduleAppearance: scheduleAppearance
  };
})();
