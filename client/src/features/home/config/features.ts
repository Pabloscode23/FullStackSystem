/**
 * Features configuration
 * Defines the list of features displayed on the home page
 * Each feature includes an icon, gradient, and navigation link
 */
import {
    BookOpenIcon,
    UserGroupIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import type { Feature } from '../types';

export const features: Feature[] = [
    {
        title: 'pages.home.features.pokedex',
        description: 'pages.home.features.pokedexDescription',
        gradient: 'from-sky-500 to-blue-500',
        icon: BookOpenIcon,
        href: '/pokemon'
    },
    {
        title: 'pages.home.features.teams',
        description: 'pages.home.features.teamsDescription',
        gradient: 'from-indigo-500 to-purple-500',
        icon: UserGroupIcon,
        href: '/teams'
    },{
        title: 'pages.home.features.team',
        description: 'pages.home.features.teamDescription',
        gradient: 'from-purple-500 to-pink-500',
        icon: HeartIcon,
        href: '/favorites'
    }
]; 