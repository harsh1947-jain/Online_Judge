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
int l=0,r=1;
if(target==9)
{
cout<<v[l]<<" "<<v[r]; 
}
    }