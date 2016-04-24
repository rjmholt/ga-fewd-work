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

If you would rather not run the website off the webserver, go into the
`website` directory and run:

    find . -type f -exec sed -i 's|/pages/||g' {} +

You should then be able to open the html files directly, and links will work
for things like CSS and loading the `nav` menu.

Why are you using a webserver? That's overkill
----------------------------------------------

No particular reason is great, but there are a few:

* I've never used a webserver before -- I wanted to try it out
* It's convenient for structuring the page paths
* The website is not very JS involved, so to compensate I was thinking of
  trying to implement something using websockets (merging things I've learnt
  in another project in Erlang -- hence the choice of webserver).
