/*global jQuery */
(function ($) {

  $.fn.shrinkFontToFit = function (opts) {

    var defaultOpts = $.extend({
      minFontSize: 6,
      wrapAtMinSize: false
    }, opts);

    function fontReducer($target) {
      if ($target.prop('scrollWidth') > $target.width()) {
        var newFontSize = parseInt($target.css('font-size')) - 1;
        if (newFontSize < defaultOpts.minFontSize) { // don't allow smaller than this
          if (defaultOpts.wrapAtMinSize) {
            $target.css('white-space', 'normal');
            return;
          }
          $target.css('overflow', 'hidden')
            .css('text-overflow', 'ellipsis');
          return;
        }
        $target.css('font-size', newFontSize + 'px');
        return fontReducer($target);
      }
      return;
    }

    return this.each(function () {
      $(this).css('white-space', 'nowrap');
      fontReducer($(this));
    });

  };

})(jQuery);
