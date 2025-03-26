export const update = async (id: string, updateData: User): Promise<UnitUser | null> => {
    if (!users[id]) return null;

    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    users[id] = { ...users[id], ...updateData };
    saveUsers();
    return users[id];
};

export const remove = async (id: string): Promise<void> => {
    if (users[id]) {
        delete users[id];
        saveUsers();
    }
};