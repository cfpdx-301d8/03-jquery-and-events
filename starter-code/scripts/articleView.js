//  Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
//this makes an object called articleView
var articleView = {};

// this add a method of populateFilters to the articleView object
articleView.populateFilters = function() {
  //this selects the article element in the document that doesnt have a class of template and loops throught each one with a function
  $('article').not('.template').each(function() {
    //this makes three variables
    var authorName, category, optionTag;
    //this sets the authorName to the text of the anchor element of the object that is acting on
    authorName = $(this).find('address a').text();
    //this sets the optionTag variable to this string
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    // this get an element with id of authorfilter and appends whats in option tag
    $('#author-filter').append(optionTag);
    // it gets the target elements attribute of data category
    category = $(this).attr('data-category');
    // resuses optionTag variable to use category
    optionTag = '<option value="' + category + '">' + category + '</option>';
    // if nothing there it puts something there
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      // it appends the object with the value of option tag
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      var $authorName = $(this).val();
      $('article').hide();
      $('[data-author="' + $authorName + '"]').fadeIn(1000);

      /* DONE TODO: If the select box changes to an option that has a value, we should:
          1. Hide all of the articles
          2. Fade in only the articles that match based on on the author
            that was aselected. Hint: use an attribute selector to find
            those articles that match the value, and then fade them in.
        */
    } else {
      $('article').not('.template').fadeIn(1000);
    /* Otherwise, we should:
        1. Show all the articles except the template */
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    $('#author-filter').val('');
    if ($(this).val()) {
      var $categoryName = $(this).val();
      $('article').hide();
      $('[data-category="' + $categoryName + '"]').fadeIn(1000);
    } else {
      $('article').not('.template').fadeIn(1000);
    }
  });
}

  /* DONE TODO: Just like we do for #author-filter above, we should also handle
  change events on the #category-filter element. Be sure to reset the
  #author-filter while you're at it! */

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    var $clickedTab = $(this).attr('data-content');
    $('#' + $clickedTab).fadeIn(1000);
    /* DONE TODO:
      1. Hide all of the .tab-content sections
      2. Fade in the single .tab-content section that is
        associated with the .tab element's data-content attribute.
    */
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // Truncate logic to show only first two elements within the article body.
  $('.article-body *:nth-of-type(n+2)').hide();
  $('.read-on').on('click', function() {
    if(this.text === 'Read on') {
      $(this).parent().find('.article-body *:nth-of-type(n+2)').show();
      $(this).text('Show Less');
    } else {
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
      $(this).text('Read on');
    }
  });
  /* DONE TODO: Add a delegated event handler to reveal the remaining paragraphs.
    When a .read-on link is clicked, we can:
    1. Prevent the default action of a link.
    2. Reveal everything in that particular article now.
    3. Hide that read-on link!

    // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
  */
};

// DONE TODO: Invoke all of the above functions (I mean, methods!):
articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();