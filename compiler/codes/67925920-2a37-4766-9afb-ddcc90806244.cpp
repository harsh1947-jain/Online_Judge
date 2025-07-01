#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);

    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }

    int target;
    cin >> target;

    sort(v.begin(), v.end());

    int l = 0, r = n - 1;

    while(l < r) {
        int sum = v[l] + v[r];
        if(sum == target) {
            cout << l << " " << r << endl; 
            break;
        } else if(sum < target) {
            l++;
        } else {
            r--;
        }
    }

    return 0;
}
