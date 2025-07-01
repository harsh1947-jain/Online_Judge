#include<bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
   int n;
cin>>n;
vector<int>v(n);
for(int i=0;i<n;i++)
{
cin>>v[i];
}
int t;cin>>t;
sort(v.begin(),v.end());int l=0,r=n-1;
while(l<=r)
{
if((v[l]+v[r])==t){cout<<v[l]<<" "<<v[r];break;}
else if((v[l]+v[r])<t){l++;}
else{r--;}
}


    return 0;
}