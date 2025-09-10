package Strings;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import Recursion.EarliestandLatestRoundsWherePlayersCompete1900;

public class RemoveSubFoldersfromFilesystem1233 {
    public List<String> removeSubfolders(String[] folder) {
        Arrays.sort(folder);
        List<String> result = new ArrayList<>();
        // The first folder can never be a sub-folder after sorting
        result.add(folder[0]);
        // Iterate through the sorted folders
        for (int i = 1; i < folder.length; i++) {
            String currFolder = folder[i];
            String lastFolder = result.get(result.size() - 1);
            lastFolder += "/";
            if (!currFolder.startsWith(lastFolder)) {
                result.add(currFolder);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        // String[] folder = {"/a","/a/b","/c/d","/c/d/e","/c/f"};
        String[] folder = { "/a/b/c", "/a/b/ca", "/a/b/d" };
        RemoveSubFoldersfromFilesystem1233 sol = new RemoveSubFoldersfromFilesystem1233();
        List<String> result = sol.removeSubfolders(folder);
        System.out.println("removeSubfolders " + result);
    }
}
