# timeago: A JavaScript microlib

Timeago is a fork of [jquery-timeago](https://github.com/rmm5t/jquery-timeago)
without the jQuery dependency. In fact, it provides no DOM utilities at all --
it only provides the functions to parse dates, and convert date diffs into
casual human representations, e.g. "2 minutes ago". Or, using a locale,
something like "Yo, 2 minutes ago homie".

## Usage

```html
<script src="timeago.js" type="text/javascript"></script>
```

To turn all abbr elements with a class of timeago and an ISO 8601
timestamp in the title (conforming to the
[datetime design pattern microformat](http://microformats.org/wiki/datetime-design-pattern)):

```html
<abbr class="timeago" title="2011-12-17T09:24:17Z">December 17, 2011</abbr>
```

into something like this:

```html
<abbr class="timeago" title="December 17, 2011">about 1 day ago</abbr>
```

Do this:

```js
var date, elements = document.getElementsByClassName("timeago");

for (var i = 0, l = elements.length; i < l; ++i) {
    date = timeago.parse(elements[i].title);
    elements[i].title = elements[i].innerHTML;
    elements[i].innerHTML = timeago.relative(date);
}
```

## Author

Original jquery-timeago library by [Ryan McGeary](http://ryan.mcgeary.org) ([@rmm5t](http://twitter.com/rmm5t)).
Un-jQuery-fication by [Christian Johansen](http://cjohansen.no) ([@cjno](http://twitter.com/cjno)).

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)<br>
Copyright (c) 2013, Christian Johansen (christian@cjohansen.no)
