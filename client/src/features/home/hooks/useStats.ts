/**
 * Custom hook to manage stats data for the home page
 * Fetches and maintains user count from Firebase
 * Returns an array of stats with their respective icons and gradients
 */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import {
    BookOpenIcon,
    UsersIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import type { Stat } from '../types';

export function useStats() {
    const { t } = useTranslation();
    const { getUsersCount } = useAuth();
    const [usersCount, setUsersCount] = useState(0);

    useEffect(() => {
        const fetchUsersCount = async () => {
            const count = await getUsersCount();
            setUsersCount(count);
        };

        fetchUsersCount();
    }, [getUsersCount]);

    const stats: Stat[] = [
        {
            number: '200',
            label: t('pages.home.stats.pokemon'),
            icon: BookOpenIcon,
            gradient: 'from-sky-500 to-indigo-500'
        },
        {
            number: usersCount.toString(),
            label: t('pages.home.stats.trainers'),
            icon: UsersIcon,
            gradient: 'from-indigo-500 to-purple-500'
        },
        {
            number: t('pages.home.stats.teamsCount'),
            label: t('pages.home.stats.teams'),
            icon: SparklesIcon,
            gradient: 'from-purple-500 to-pink-500'
        }
    ];

    return stats;
} 