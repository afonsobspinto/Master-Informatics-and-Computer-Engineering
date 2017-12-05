 #!/bin/bash
/etc/init.d/networking restart
ifconfig eth0 up
ifconfig eth0 172.16.30.254/24
ifconfig eth1 up
ifconfig eth1 172.16.31.253/24
echo 1 > /proc/sys/net/ipv4/ip_forward
echo 0 > /proc/sys/net/ipv4/icmp_echo_ignore_broadcasts
route add default gw 172.16.31.254

cp /etc/resolv.conf /etc/resolv.conf.backup
echo "search lixa.netlab.fe.up.pt" > /etc/resolv.conf
echo "nameserver 172.16.1.2" >> /etc/resolv.conf
