#!/usr/bin/perl -w
use strict;
use warnings;
use Garden::CGIHandler;
use Garden::User;

my $query = Garden::CGIHandler->new;

my $user = Garden::User->new(request => $query->request, 'decode-content'=>0);
my $response = $user->generate_login_page;
$query->send_response($response);
