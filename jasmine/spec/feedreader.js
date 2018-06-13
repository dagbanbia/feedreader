/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    let entriesStart,
        entriesEnd;
    /* This is the first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         *  and ensures that it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* This is a second test suite named "The menu" */

    describe('The menu',function(){

        /* This test ensures that the menu element is hidden by default.
         *  It is achieve by checking if 
         * the body element has the 'menu-hidden' class.
         */

         it('The menu element should be hidden by default',function(){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });

         /* This test ensures that menu changes
          * visibility when the menu icon is clicked. This implies the test
          * should have two expectations: that is the menu display when
          * clicked and the menu hide when clicked again.
          */
          
          it('should change the visibility when menu icon is clicked', function () {

              // When the menu icon is clicked we expect that the 'menu-hidden' class to be removed

            $(".menu-icon-link").trigger('click'); 
            expect($("body").hasClass('menu-hidden')).toBe(false);

            // When the menu icon is clicked again we expect that the 'menu-hidden' class to be applied

            $(".menu-icon-link").trigger('click'); 
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });
    })

    /* The third test suite named "Initial Entries" */

    describe('Initial Entries',function(){

        // Because the test is async  Jasmine's beforeEach and done() funcitons were used.

        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous ,so jasmines beforeEach function was used

         */

         it('define if entry has more than 0 entries',function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

    // This is the fourth test suite named "New Feed Selection" 
    describe('New Feed Selection',function(){

       let initialFeed,
           newFeed;

        beforeEach(function(done){
            loadFeed(0,function(){
                initialFeed = $('.feed').text();
                 done()
            });

            loadFeed(1,function(){
                    newFeed = $('.feed').text();
                    done();
            });
            
        });

        /* This test  ensures that when a new feed is loaded
         * by the loadFeed function , the content actually changes.
         */

         it('new feed is different to old one',function(){
            expect(newFeed).not.toBe(initialFeed);
         });
    });
}());
