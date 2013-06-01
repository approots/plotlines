app.factory("graph", function() {
    var data;
    var setData = function(d) {
        data = d;
        this.event = true;
    }

    var getData = function() {
        this.event = false;
        return data;
    }

    return {
        //
        event : false,
        setData : setData,
        getData : getData
    }
});

/**
 * types of notifications:
 * 1. flash
 * 2. route change error
 */
app.factory("notification", function($rootScope) {
    var flashHolding = [];
    var loading = false;
    //var routeError = null;
    // alert format {type:'success',message:'You done good.'}
    var alerts = [];

    var addFlash = function(flashAlert) {
        flashHolding.push(flashAlert);
    };
    var closeAlert = function(index) {
        alerts.splice(index, 1);
    };
    var addAlert = function(alertObj) {
        alerts.push(alertObj);
    };
    var getAlerts = function () {
        return alerts;
    };
    /*
    var getRouteError = function () {
        return routeError;
    }
    */
    var getLoading = function () {
        return loading;
    }

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        // clear all alerts
        alerts = [];
        loading = true;

        if (flashHolding.length) {
            alerts.push.apply(alerts, flashHolding);
            flashHolding = [];
        }
    });
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        loading = false;
    });
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        loading = false;
        // handle route errors in the resolve property of routeProvider, or in the controller?
        //routeError = rejection;
        //alert("ROUTE CHANGE ERROR: " + rejection);
    });

    return {
        addFlash: addFlash,
        //getFlash: getFlash,

        getLoading: getLoading,

        //getRouteError: getRouteError,

        getAlerts: getAlerts,
        addAlert: addAlert,
        closeAlert: closeAlert
    }
});

app.factory("utils", function() {
        return {
            UUID : function () {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random()*16)%16 | 0;
                    d = Math.floor(d/16);
                    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
                });
                return uuid;
            },
            randomString : function(length, existingStrings) {
                length = (typeof length === 'undefined') ? 8 : length;
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var string = '';
                var rnum = 0;
                var i = 0;
                for (i; i < length; i++) {
                    rnum = Math.floor(Math.random() * chars.length);
                    string += chars.substring(rnum,rnum+1);
                }
                // Avoid duplicates
                if ((existingStrings) && (existingStrings.indexOf(string) >= 0)) {
                    string = this.randomString(length, existingStrings);
                }
                return string;
            },
            escapeHtml : function (unsafe) {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            },
            slugify : function (str) {
                str = str.replace(/^\s+|\s+$/g, ''); // trim
                str = str.toLowerCase();

                // remove accents, swap ñ for n, etc
                var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
                var to   = "aaaaeeeeiiiioooouuuunc------";
                for (var i=0, l=from.length ; i<l ; i++) {
                    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                }

                str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                    .replace(/\s+/g, '-') // collapse whitespace and replace by -
                    .replace(/-+/g, '-'); // collapse dashes

                return str;
            }
        }
    });

// Can add messages to the queue, but only when route changes will the current message be set.
app.factory("Flash", function($rootScope) {
    var queue = [], currentMessage = {};

    $rootScope.$on('$routeChangeSuccess', function() {
        if (queue.length > 0) {
            console.log('routeChangeSuccess called set message');
            currentMessage = queue.shift();
        } else {
            console.log('routeChangeSuccess called NO message');
            currentMessage = '';
        }
    });

    return {
        set: function(message) {
            queue.push(message);
        },
        get: function() {
            return currentMessage;
        }
    };
});

app.factory('Story', function (utils) {
    var self = this;
    var stories;

    return {
        // TODO: strategy for keeping this data in memory and not always deserializing?
        stories : function(isKeyed) {

            isKeyed = typeof isKeyed === 'undefined' ? true : isKeyed;
            // Stories are stored as properties of an object to prevent duplicates:
            // {
            //  'bob : {title:'bob',description:''},
            //  'jane-goes-to-school : {title:'jane goes to school',description:'jane is a good school girl'}
            // }
            // But we might want just the values, not the keys, so
            // then set the "isKeyed" flag to false and return an array.

            if (self.stories) {
                return self.stories;
            }
            $http({method: 'GET', url: 'http://plotlinesapi/stories'}).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    self.stories = '{"title":"success",description:"Description"}';
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    self.stories = '{"title":"error",description:"Description"}';
                });

            //var stories = this.getLocalStorage("stories");
            if (stories) {
                if (! isKeyed) {
                    // flatten the keyed array.
                    var temp = [];
                    angular.forEach(stories, function(value, key){
                        temp.push(value);
                    });
                    stories = temp;
                }
            } else {
                stories = {};
            }
            return stories;
        },
        existingIds : function (exclude) {
            var stories = this.stories();
            var existingIds = [];
            var junk;
            /* A little ugly, but avoiding unnecessary cycles */
            if (exclude) {
                angular.forEach(stories, function(value, key){
                    if (key !== exclude) {
                        existingIds.push(key);
                    }
                });
            } else {
                angular.forEach(stories, function(value, key){
                    existingIds.push(key);
                });
            }
            return existingIds;
        },
        existingTitles : function () {
            var stories = this.stories();
            var existingTitles = [];
            angular.forEach(stories, function(value, key){
                existingTitles.push(value.title);
            });
            return existingTitles;
        },
        // TODO delete passages
        deleteStory : function(id) {
            var success = false;
            var stories = this.stories();
            if (stories[id]) {
                delete stories[id];
                this.saveStories(stories);
                success = true;
            }
            return success;
        },
        // TODO update slug ids for passage keys?
        // Create an immutable id for stories? - No, slug must be unique so another id is redundant. If a title, and thus
        // a slug changes, we might later have a history strategy for finding stories for non-existent slugs.
        saveStory : function(title, description, originalStory) {
            // Get the stories object from local storage
            // TODO html escape stuff before saving or on output? Strategy?
            var stories = this.stories();
            var i = 1;
            var id = "";
            var story = {};


            if (originalStory) {
                // update
                // may need to only change description for an existing story,
                // or may need to change the id slug to match a new title
                if (stories[originalStory.id]) {
                    if (title == originalStory.title) {
                        id = originalStory.id;
                    } else {
                        // If the slugified title is different from the original id,
                        // then delete the original story and create a new id slug.
                        delete stories[originalStory.id];
                        id = this.makeUniqueSlug(title, stories);
                    }
                } else {
                    // TODO error: story deleted by another user!
                }
            } else {
                // create make sure id is unique
                id = this.makeUniqueSlug(title, stories);
            }



            stories[id] = {id:id, title:title, description:description};

            this.saveStories(stories);

            return stories[id];
        },
        makeUniqueSlug : function(title, stories) {
            var i = 1;
            var id = utils.slugify(title);

            if (stories[id]) {
                // NOTE: this is now probably redundant since we validate if a title produces an existing slug.
                // A similar title can produce the same slug (Bob & Lolo, Bob Lolo). If so, then make the slug unique by adding a digit
                // There could be any number of similar slugs (title-1, title-2,...,title-n)
                // so be sure to add a unique one
                while (true) {
                    if (! stories[id + '-' + i]) {
                        id = id + '-' + i;
                        break;
                    }
                    i++;
                }
            }

            return id;
        },
        saveStories : function(json) {
            // Save the updated stories object back to local storage
            this.setLocalStorage("stories",json);

        },
        story : function(id) {
            //localStorage.clear();
            var story = false;

            var stories = this.getLocalStorage("stories",false);
            if (stories) {
                if (stories[id]) {
                    story = stories[id];
                }
            }
            return story;
        },

        // Passages are keyed by story id
        // TODO too much data to serialize/deserialize! Should each story be a separate localstorage entity?
        // TODO maybe keep a separate entity per passage? And an array entity for all passages just including essentials
        // for building the graph like passage ids, titles, and links destinations.
        // So we have:
        // 1 "s" array for story entities keyed by story id.
        // TBD n number of s_{storyId} entities if we don't want to deserialize the story array to get a particular story.
        // n number of g_{storyId} for all passages entities for a storyId for building a graph (just essential info like ids, titles, and links destinations
        // n number of p_{storyId}_{passageId} for passage details?

        // passage_storyId = [
        // passageId : {id:id, title:title, description:description, links:[{title:title, destination:id},...]},
        // anotherPssageId : {id:id, title:title, description:description, links:[{title:title, destination:id},...]}
        // ];
        // stories = {
        //  storyIdSlug : {title:'bob',description:''},
        //  anotherStoryIdSlug : {title:'jane\'s school',description:'jane is a good school girl'}
        // }
        savePassage : function(storyId, passage) {
            var passageKeyLength = 8;
            var keyId;
            var passageId;
            var passageIds;
            var passage;
            var passages;

            keyId = "passages_" + storyId;
            passages = this.getLocalStorage(keyId);
            console.log("saving passages");
            if (passage.id) {
                // Edit
                console.log("passage exists");
                passageId = passage.id;
                passage = {id:passageId, title:passage.title, text:passage.text};
                if (passages) {
                    passages[passageId] = passage;
                } else {
                    // All passages deleted while editing this one? Could it happen?
                    passages = {passageId : passage};
                }
            } else {
                // Create
                if (passages) {
                    console.log("new passage adding to existing");
                    // At least one passage exists for this story.
                    // Create a unique id for the new passage, add to the rest, and save.
                    passageId = utils.randomString(passageKeyLength, Object.keys(passages));
                    passage = {id:passageId, title:passage.title, text:passage.text};
                    passages[passageId] = passage;
                } else {
                    console.log("new passage, none there yet");
                    // This story hasn't any passages yet.
                    passageId = utils.randomString(passageKeyLength);
                    passage = {id:passageId, title:passage.title, text:passage.text};
                    passages = {passageId : passage};
                }
            }

            this.setLocalStorage(keyId, passages);

            return passageId;
        },
        passages : function(storyId, isKeyed) {
            isKeyed = typeof isKeyed === 'undefined' ? true : isKeyed;
            var keyId = "passages_" + storyId;
            // Passages are stored as properties of an object to prevent duplicates:
            // {
            //  'someid : {title:'bob',description:''},
            //  'anotherid : {title:'jane goes to school',description:'jane is a good school girl'}
            // }
            // But we might want just the values, not the keys, so
            // then set the "isKeyed" flag to false and return an array.
            // var stories = localStorage['stories'];
            var passages = this.getLocalStorage(keyId);
            if (passages) {
                if (! isKeyed) {
                    // flatten the keyed array.
                    var temp = [];
                    angular.forEach(passages, function(value, key){
                        temp.push(value);
                    });
                    passages = temp;
                }
            } else {
                passages = {};
            }
            return passages;
        },
        passage : function(storyId, passageId, valOnFailure) {
            var passage = valOnFailure;
            var keyId = "passages_" + storyId;
            var passages = this.getLocalStorage(keyId);

            if (passages && passages[passageId]) {
                passage = passages[passageId];
            }

            return passage;
        },
        existingPassageTitles : function(storyId, toLowerCase) {
            toLowerCase = typeof toLowerCase === 'undefined' ? false : toLowerCase;
            var passages = this.passages(storyId, false);
            var titles = [];
            if (toLowerCase) {
                angular.forEach(passages, function(value, key){
                    titles.push(value.title.toLowerCase());
                });
            } else {
                angular.forEach(passages, function(value, key){
                    titles.push(value.title);
                });
            }

            return titles;
        },
        // Get data from localstorage.
        // If exists, return as json, else return as specified by valOnFailure (default undefined).
        getLocalStorage : function(key, valOnFailure) {
            var data = localStorage[key];
            if (data) {
                data = JSON.parse(data);
            } else {
                data = valOnFailure;
            }
            return data;
        },
        setLocalStorage : function(key, json) {
            var string = JSON.stringify(json);
            localStorage[key] = string;
        }
    }
});

// TODO don't change the url slug when updating title? Issue of bookmarking stories!
// Just provide fair warning? Keep a slug history (if link doesn't exist, check history and load if found?
// History would have to be reconciled on each title change and be complex/messy!
// TODO should I use/include unique ids/hashes in urls for simplicity?
app.factory('Persist', function (utils) {
    return {
        existingIds : function (exclude) {
            var stories = this.stories();
            var existingIds = [];
            var junk;
            /* A little ugly, but avoiding unnecessary cycles */
            if (exclude) {
                angular.forEach(stories, function(value, key){
                    if (key !== exclude) {
                        existingIds.push(key);
                    }
                });
            } else {
                angular.forEach(stories, function(value, key){
                    existingIds.push(key);
                });
            }
            return existingIds;
        },
        existingTitles : function () {
            var stories = this.stories();
            var existingTitles = [];
            angular.forEach(stories, function(value, key){
                existingTitles.push(value.title);
            });
            return existingTitles;
        },
        // TODO delete passages
        deleteStory : function(id) {
            var success = false;
            var stories = this.stories();
            if (stories[id]) {
                delete stories[id];
                this.saveStories(stories);
                success = true;
            }
            return success;
        },
        // TODO update slug ids for passage keys?
        // Create an immutable id for stories? - No, slug must be unique so another id is redundant. If a title, and thus
        // a slug changes, we might later have a history strategy for finding stories for non-existent slugs.
        saveStory : function(title, description, originalStory) {
            // Get the stories object from local storage
            // TODO html escape stuff before saving or on output? Strategy?
            var stories = this.stories();
            var i = 1;
            var id = "";
            var story = {};


            if (originalStory) {
                // update
                // may need to only change description for an existing story,
                // or may need to change the id slug to match a new title
                if (stories[originalStory.id]) {
                    if (title == originalStory.title) {
                        id = originalStory.id;
                    } else {
                        // If the slugified title is different from the original id,
                        // then delete the original story and create a new id slug.
                        delete stories[originalStory.id];
                        id = this.makeUniqueSlug(title, stories);
                    }
                } else {
                    // TODO error: story deleted by another user!
                }
            } else {
                // create make sure id is unique
                id = this.makeUniqueSlug(title, stories);
            }



            stories[id] = {id:id, title:title, description:description};

            this.saveStories(stories);

            return stories[id];
        },
        makeUniqueSlug : function(title, stories) {
            var i = 1;
            var id = utils.slugify(title);

            if (stories[id]) {
                // NOTE: this is now probably redundant since we validate if a title produces an existing slug.
                // A similar title can produce the same slug (Bob & Lolo, Bob Lolo). If so, then make the slug unique by adding a digit
                // There could be any number of similar slugs (title-1, title-2,...,title-n)
                // so be sure to add a unique one
                while (true) {
                    if (! stories[id + '-' + i]) {
                        id = id + '-' + i;
                        break;
                    }
                    i++;
                }
            }

            return id;
        },
        saveStories : function(json) {
            // Save the updated stories object back to local storage
            this.setLocalStorage("stories",json);

        },
        story : function(id) {
            //localStorage.clear();
            var story = false;

            var stories = this.getLocalStorage("stories",false);
            if (stories) {
                if (stories[id]) {
                    story = stories[id];
                }
            }
            return story;
        },
        // TODO: strategy for keeping this data in memory and not always deserializing?
        stories : function(isKeyed) {
            isKeyed = typeof isKeyed === 'undefined' ? true : isKeyed;
            // Stories are stored as properties of an object to prevent duplicates:
            // {
            //  'bob : {title:'bob',description:''},
            //  'jane-goes-to-school : {title:'jane goes to school',description:'jane is a good school girl'}
            // }
            // But we might want just the values, not the keys, so
            // then set the "isKeyed" flag to false and return an array.
           // var stories = localStorage['stories'];
            var stories = this.getLocalStorage("stories");
            if (stories) {
                if (! isKeyed) {
                    // flatten the keyed array.
                    var temp = [];
                    angular.forEach(stories, function(value, key){
                        temp.push(value);
                    });
                    stories = temp;
                }
            } else {
                stories = {};
            }
            return stories;
        },
        // Passages are keyed by story id
        // TODO too much data to serialize/deserialize! Should each story be a separate localstorage entity?
        // TODO maybe keep a separate entity per passage? And an array entity for all passages just including essentials
        // for building the graph like passage ids, titles, and links destinations.
        // So we have:
        // 1 "s" array for story entities keyed by story id.
        // TBD n number of s_{storyId} entities if we don't want to deserialize the story array to get a particular story.
        // n number of g_{storyId} for all passages entities for a storyId for building a graph (just essential info like ids, titles, and links destinations
        // n number of p_{storyId}_{passageId} for passage details?

        // passage_storyId = [
        // passageId : {id:id, title:title, description:description, links:[{title:title, destination:id},...]},
        // anotherPssageId : {id:id, title:title, description:description, links:[{title:title, destination:id},...]}
        // ];
        // stories = {
        //  storyIdSlug : {title:'bob',description:''},
        //  anotherStoryIdSlug : {title:'jane\'s school',description:'jane is a good school girl'}
        // }
        savePassage : function(storyId, passage) {
            var passageKeyLength = 8;
            var keyId;
            var passageId;
            var passageIds;
            var passage;
            var passages;

            keyId = "passages_" + storyId;
            passages = this.getLocalStorage(keyId);
            console.log("saving passages");
            if (passage.id) {
                // Edit
                console.log("passage exists");
                passageId = passage.id;
                passage = {id:passageId, title:passage.title, text:passage.text};
                if (passages) {
                    passages[passageId] = passage;
                } else {
                    // All passages deleted while editing this one? Could it happen?
                    passages = {passageId : passage};
                }
            } else {
                // Create
                if (passages) {
                    console.log("new passage adding to existing");
                    // At least one passage exists for this story.
                    // Create a unique id for the new passage, add to the rest, and save.
                    passageId = utils.randomString(passageKeyLength, Object.keys(passages));
                    passage = {id:passageId, title:passage.title, text:passage.text};
                    passages[passageId] = passage;
                } else {
                    console.log("new passage, none there yet");
                    // This story hasn't any passages yet.
                    passageId = utils.randomString(passageKeyLength);
                    passage = {id:passageId, title:passage.title, text:passage.text};
                    passages = {passageId : passage};
                }
            }

            this.setLocalStorage(keyId, passages);

            return passageId;
        },
        passages : function(storyId, isKeyed) {
            isKeyed = typeof isKeyed === 'undefined' ? true : isKeyed;
            var keyId = "passages_" + storyId;
            // Passages are stored as properties of an object to prevent duplicates:
            // {
            //  'someid : {title:'bob',description:''},
            //  'anotherid : {title:'jane goes to school',description:'jane is a good school girl'}
            // }
            // But we might want just the values, not the keys, so
            // then set the "isKeyed" flag to false and return an array.
            // var stories = localStorage['stories'];
            var passages = this.getLocalStorage(keyId);
            if (passages) {
                if (! isKeyed) {
                    // flatten the keyed array.
                    var temp = [];
                    angular.forEach(passages, function(value, key){
                        temp.push(value);
                    });
                    passages = temp;
                }
            } else {
                passages = {};
            }
            return passages;
        },
        passage : function(storyId, passageId, valOnFailure) {
            var passage = valOnFailure;
            var keyId = "passages_" + storyId;
            var passages = this.getLocalStorage(keyId);

            if (passages && passages[passageId]) {
                passage = passages[passageId];
            }

            return passage;
        },
        existingPassageTitles : function(storyId, toLowerCase) {
            toLowerCase = typeof toLowerCase === 'undefined' ? false : toLowerCase;
            var passages = this.passages(storyId, false);
            var titles = [];
            if (toLowerCase) {
                angular.forEach(passages, function(value, key){
                    titles.push(value.title.toLowerCase());
                });
            } else {
                angular.forEach(passages, function(value, key){
                    titles.push(value.title);
                });
            }

            return titles;
        },
        // Get data from localstorage.
        // If exists, return as json, else return as specified by valOnFailure (default undefined).
        getLocalStorage : function(key, valOnFailure) {
            var data = localStorage[key];
            if (data) {
                data = JSON.parse(data);
            } else {
                data = valOnFailure;
            }
            return data;
        },
        setLocalStorage : function(key, json) {
            var string = JSON.stringify(json);
            localStorage[key] = string;
        }
    }
});

