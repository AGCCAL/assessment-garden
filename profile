#!/usr/bin/perl -w
use strict;
use warnings;
use Garden::CGIHandler;
use Garden::Profile;

my $query = Garden::CGIHandler->new;

my $profile = Garden::Profile->new(request => $query->request, 'decode-content'=>0);
my $response = $profile->generate_profile;
$query->send_response($response);
