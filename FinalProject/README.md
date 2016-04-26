Rob's Website
=============

Requirements
------------

* Web Browser
* Possibly an Erlang installation (it might be packaged in the binary, but I'm
  not sure)

Instructions
------------

After you pull the website, go into the the `robnet` directory and run the
following command :
    
    make && ./_rel/robnet_release/bin/robnet_release console

You can then access the website at `localhost:8080`, and navigate from there.

Currently, the paths should work both with the webserver and from the
file system. If you don't have Erlang and the file system approach doesn't
work, try:

    python -m SimpleHTTPServer 8080

And access at the `localhost:8080`.

Currently, without a webserver, the nav paths are broken because they must
be relative, but are imported into different levels of the filesystem.

Why are you using a webserver? That's overkill
----------------------------------------------

There are a couple of reasons. No particular one is compelling, but they
sort of added up:

* I've never used a webserver before -- I wanted to try it out
* It's convenient for structuring the page paths
* The website is not very JS involved. So to compensate I was thinking of
  trying to implement something using websockets (merging things I've learnt
  in another project in Erlang -- hence the choice of webserver).

Third Party Dependencies
------------------------

The website uses [prism.js](http://prismjs.com) to do code highlighting. This
is imported for a number of reasons:
* Code highlighting is a small presentation task -- not the focus of my project
* Doing code highlighting manually would become a big task quickly, and distract
  from completing bigger goals in the project
* I'm hoping to deploy the website in the real world, at which point it will be
  better off with a third-party maintained library running such a function. They
  do it better than I could, and will continue to make it work after I forget
  about it.
