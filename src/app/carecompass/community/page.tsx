import { Button } from '@/components/ui/Button'
import { Plus, Heart, MessageCircle, Users, TrendingUp, Calendar } from 'lucide-react'
import Link from 'next/link'

// Screen D: Community Support Groups
export default function CommunitySupport() {
  const supportGroups = [
    {
      id: 1,
      name: 'Diabetes Support Circle',
      members: 1247,
      category: 'Chronic Conditions',
      description: 'A supportive community for people managing diabetes and their families.',
      isJoined: true,
      recentActivity: '15 new posts today',
      nextMeeting: '2024-12-28 at 7:00 PM'
    },
    {
      id: 2,
      name: 'Mental Health Warriors',
      members: 892,
      category: 'Mental Health',
      description: 'Safe space for sharing experiences and supporting each other through mental health journeys.',
      isJoined: false,
      recentActivity: '8 new posts today',
      nextMeeting: '2024-12-30 at 6:00 PM'
    },
    {
      id: 3,
      name: 'Heart Health Heroes',
      members: 634,
      category: 'Cardiovascular',
      description: 'Community focused on heart health, prevention, and recovery support.',
      isJoined: true,
      recentActivity: '12 new posts today',
      nextMeeting: '2025-01-02 at 5:30 PM'
    },
    {
      id: 4,
      name: 'Cancer Survivors Network',
      members: 456,
      category: 'Cancer Support',
      description: 'Connecting cancer survivors and their families for mutual support and encouragement.',
      isJoined: false,
      recentActivity: '6 new posts today',
      nextMeeting: '2025-01-05 at 4:00 PM'
    }
  ]

  const recentPosts = [
    {
      id: 1,
      author: 'Sarah M.',
      group: 'Diabetes Support Circle',
      content: 'Just wanted to share that I finally got my A1C under 7! Thank you all for the support and tips.',
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      author: 'Mike R.',
      group: 'Heart Health Heroes',
      content: 'Completed my first 5K run post-surgery! Feeling grateful for this amazing community.',
      likes: 31,
      comments: 12,
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      author: 'Anonymous',
      group: 'Mental Health Warriors',
      content: 'Having a tough day but remembering that it\'s okay to not be okay. Thank you for the safe space.',
      likes: 18,
      comments: 15,
      timeAgo: '6 hours ago'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/carecompass">
                <Button variant="ghost" size="sm">←</Button>
              </Link>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Community</h1>
            </div>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* My Groups */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Groups</h2>
          <div className="space-y-4">
            {supportGroups.filter(group => group.isJoined).map((group) => (
              <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{group.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{group.members.toLocaleString()} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{group.recentActivity}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full">
                    Joined
                  </span>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">
                      Next meeting: {group.nextMeeting}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    View Posts
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Join Meeting
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discover Groups */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Discover Groups</h2>
          <div className="space-y-4">
            {supportGroups.filter(group => !group.isJoined).map((group) => (
              <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{group.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{group.members.toLocaleString()} members</span>
                      </div>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {group.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    Join Group
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Community Posts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">in {post.group}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Community Guidelines</h3>
          <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
            <p>• Be respectful and supportive to all members</p>
            <p>• Share experiences, not medical advice</p>
            <p>• Protect privacy - no personal medical details</p>
            <p>• Report inappropriate content to moderators</p>
          </div>
          <Button variant="outline" size="sm" className="mt-3">
            Read Full Guidelines
          </Button>
        </div>
      </div>
    </div>
  )
}