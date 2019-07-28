To run, you'll need to tunnel to this app, then create the following commands:
```
!bid $(urlfetch http://<path>/auction/$(user)?bid=$(1))\
!topbid	$(urlfetch http://<path>/auction/)
```
