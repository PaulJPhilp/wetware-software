import React from 'react';
import { NotionFeaturedSeries } from './NotionFeaturedSeries';
import { getFeaturedPosts } from '../lib/notion-utils';
import Link from 'next/link';

/**
 * BlogHomePageWithSeries Component
 * 
 * Example implementation of a blog home page that integrates
 * the Notion-powered featured series sidebar with main content
 */
export async function BlogHomePageWithSeries() {
  // Fetch featured posts for the main content area
  const featuredPosts = await getFeaturedPosts(5);

  return (
    <div className="min-h-screen bg-background">
      {/* Container for the entire layout */}
      <div className="flex flex-col md:flex-row">
        
        {/* Featured Series Section - Sidebar on desktop, stacked on mobile */}
        <NotionFeaturedSeries limit={3} />
        
        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <section className="mb-12">
              <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4">
                Welcome to Wetware Software
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Exploring the intersection of human intelligence and artificial 
                intelligence through thoughtful writing and practical insights.
              </p>
            </section>

            {/* Featured Posts Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-8">
                Latest Posts
              </h2>
              
              {featuredPosts.length > 0 ? (
                <div className="space-y-8">
                  {featuredPosts.map((post) => (
                    <article 
                      key={post.id} 
                      className="border-b border-border pb-8 last:border-b-0"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        {/* Post Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-orange/10 text-orange font-medium">
                              {post.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(post.publishDate).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {post.readTime} min read
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-semibold mb-3 text-foreground dark:text-white">
                            <Link 
                              href={`/posts/${post.slug}`}
                              className="hover:text-orange transition-colors"
                            >
                              {post.name}
                            </Link>
                          </h3>
                          
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {post.description}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            <Link 
                              href={`/posts/${post.slug}`}
                              className="text-orange hover:underline font-medium"
                            >
                              Read more →
                            </Link>
                            
                            {post.tags.length > 0 && (
                              <div className="flex gap-2">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <span 
                                    key={tag.name}
                                    className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                                  >
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Series Badge (if post is part of a series) */}
                        {post.seriesName && (
                          <div className="flex-shrink-0">
                            <div className="bg-card border rounded-lg p-3 text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                Part of
                              </div>
                              <div className="text-sm font-medium text-foreground">
                                {post.seriesName}
                              </div>
                              {post.partNumber && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Part {post.partNumber}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No posts available at the moment.
                  </p>
                </div>
              )}
            </section>

            {/* Call to Action */}
            <section className="text-center py-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-6">
                Get notified when new articles and series are published.
              </p>
              <Link 
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-orange text-white rounded-lg hover:bg-orange/90 transition-colors font-medium"
              >
                Learn More About This Blog
              </Link>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Simplified version for integration with existing layouts
 */
export async function FeaturedSeriesSidebar() {
  return <NotionFeaturedSeries limit={3} />;
}

export default BlogHomePageWithSeries;
