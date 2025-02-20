import { db } from '@/config/firebase';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    getDocs,
    Timestamp,
    serverTimestamp 
} from 'firebase/firestore';
import type { Team, TeamPokemon } from '@/types/team';

export const teamService = {
    // Create a new team
    createTeam: async (userId: string, name: string, pokemon: TeamPokemon[]) => {
        try {
            const teamData = {
                userId,
                name,
                pokemon,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'teams'), teamData);
            return { id: docRef.id, ...teamData };
        } catch (error) {
            console.error('Error creating team:', error);
            throw error;
        }
    },

    // Get all teams for a user
    getUserTeams: async (userId: string): Promise<Team[]> => {
        try {
            const teamsQuery = query(
                collection(db, 'teams'),
                where('userId', '==', userId)
            );

            const snapshot = await getDocs(teamsQuery);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: (doc.data().createdAt as Timestamp).toDate(),
                updatedAt: (doc.data().updatedAt as Timestamp).toDate()
            })) as Team[];
        } catch (error) {
            console.error('Error getting user teams:', error);
            throw error;
        }
    },

    // Update an existing team
    updateTeam: async (teamId: string, updates: Partial<Team>) => {
        try {
            const teamRef = doc(db, 'teams', teamId);
            await updateDoc(teamRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating team:', error);
            throw error;
        }
    },

    // Delete a team
    deleteTeam: async (teamId: string) => {
        try {
            await deleteDoc(doc(db, 'teams', teamId));
        } catch (error) {
            console.error('Error deleting team:', error);
            throw error;
        }
    },

    // Check if team name exists for user
    checkTeamNameExists: async (userId: string, name: string): Promise<boolean> => {
        try {
            const teamsQuery = query(
                collection(db, 'teams'),
                where('userId', '==', userId),
                where('name', '==', name)
            );
            const snapshot = await getDocs(teamsQuery);
            return !snapshot.empty;
        } catch (error) {
            console.error('Error checking team name:', error);
            throw error;
        }
    }
}; 