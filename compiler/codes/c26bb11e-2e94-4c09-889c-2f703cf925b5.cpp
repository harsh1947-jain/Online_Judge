#include<bits/stdc++.h>
using namespace std;

int main() {
int n;
cin>>n;
vector<int>v(n);
for(int i=0;i<n;i++)
{
cin>>v[i];
}
int target;
cin>>target;
sort(v.begin(),v.end());
int l=0,r=n-1;
while(l<=r)
{
if((v[l]+v[r])>target)r--;
else if((v[l]+v[r])<target)l++;
else 
{
cout<<l<<" "<<r;
break;
}
}
    }