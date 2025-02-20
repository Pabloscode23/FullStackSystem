/**
 * Type definitions for the home page features and stats
 * Defines the shape of Feature and Stat objects used throughout the home components
 * IconType is a reusable type for SVG icons from heroicons
 */
import type { ComponentType } from 'react';
import type { SVGProps } from 'react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface Feature {
    title: string;
    description: string;
    gradient: string;
    icon: IconType;
    href: string;
}

export interface Stat {
    number: string;
    label: string;
    gradient: string;
    icon: IconType;
} 