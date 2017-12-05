#!/bin/bash
/etc/init.d/networking restart
ifconfig eth0 up
ifconfig eth0 172.16.31.1/24
route add -net 172.16.30.0/24 gw 172.16.31.253		# add route to tux44 in order to access network 172.16.30.0/24
route add default gw 172.16.31.254			# add Rc default route of tux44

cp /etc/resolv.conf /etc/resolv.conf.backup
echo "search lixa.netlab.fe.up.pt" > /etc/resolv.conf
echo "nameserver 172.16.1.2" >> /etc/resolv.conf

